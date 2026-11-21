// Pure cricket scoring engine. Every number on the scoreboard is derived from the
// ball-by-ball log, so there are no separate counters that can drift out of sync.

export type Extra = 'wd' | 'nb' | 'b' | 'lb' | null
export type Dismissal = 'bowled' | 'caught' | 'lbw' | 'run out' | 'stumped' | 'hit wicket' | null
export type TeamKey = 'A' | 'B'
export type InningsNo = 1 | 2

export interface Ball {
  id: string
  innings: InningsNo
  /** Runs off the bat (or runs taken on byes / leg byes / wides). */
  runs: number
  extra: Extra
  wicket: boolean
  /** Epoch ms when the ball was recorded. */
  t: number
  batter?: string
  bowler?: string
  dismissal?: Dismissal
  fielder?: string
}

export interface BattingRow {
  batter: string
  runs: number
  ballsFaced: number
  fours: number
  sixes: number
  strikeRate: number
  howOut: string
}

export interface BowlingRow {
  bowler: string
  overs: string
  maidens: number
  runsConceded: number
  wickets: number
  economy: number
}

export interface OnField {
  striker: string
  nonStriker: string
  bowler: string
}

export interface Match {
  id: string
  ownerId: string
  title: string
  venue: string
  teamA: string
  teamB: string
  teamAPlayers?: string[]
  teamBPlayers?: string[]
  battingFirst: TeamKey
  oversPerInnings: number
  playersPerSide: number
  balls: Ball[]
  onField: OnField
  /** Scorer can end an innings early (e.g. declared, rain). */
  closedInnings: InningsNo[]
  createdAt: number
  updatedAt: number
}

export interface InningsSummary {
  no: InningsNo
  battingTeam: TeamKey
  runs: number
  wickets: number
  legalBalls: number
  overs: string
  runRate: number
  fours: number
  sixes: number
  extras: { wd: number; nb: number; b: number; lb: number; total: number }
  /** Runs at the end of each completed (or in-progress) over, for the worm chart. */
  cumulativeByOver: number[]
  /** Balls grouped per over, newest last. */
  overs_: Ball[][]
  complete: boolean
  batting: BattingRow[]
  bowling: BowlingRow[]
}

export type MatchStatus = 'not-started' | 'innings-1' | 'innings-break' | 'innings-2' | 'completed'

export interface MatchState {
  status: MatchStatus
  currentInnings: InningsNo
  innings: [InningsSummary, InningsSummary]
  target: number | null
  requiredRuns: number | null
  ballsRemaining: number | null
  requiredRunRate: number | null
  result: string | null
}

export const isLegal = (b: Pick<Ball, 'extra'>) => b.extra !== 'wd' && b.extra !== 'nb'

/** Total runs a delivery adds to the batting side. */
export const ballTotal = (b: Pick<Ball, 'runs' | 'extra'>) =>
  b.runs + (b.extra === 'wd' || b.extra === 'nb' ? 1 : 0)

export const formatOvers = (legalBalls: number) => `${Math.floor(legalBalls / 6)}.${legalBalls % 6}`

export const teamName = (m: Pick<Match, 'teamA' | 'teamB'>, k: TeamKey) => (k === 'A' ? m.teamA : m.teamB)

export const other = (k: TeamKey): TeamKey => (k === 'A' ? 'B' : 'A')

/** Short label used in the "this over" ball strip, e.g. "4", "W", "1wd", "nb4", "2lb". */
export function ballLabel(b: Ball): string {
  let s: string
  switch (b.extra) {
    case 'wd':
      s = b.runs ? `${b.runs + 1}wd` : 'wd'
      break
    case 'nb':
      s = b.runs ? `nb${b.runs}` : 'nb'
      break
    case 'b':
    case 'lb':
      s = `${b.runs}${b.extra}`
      break
    default:
      s = b.runs === 0 ? '•' : String(b.runs)
  }
  return b.wicket ? (s === '•' ? 'W' : `${s}W`) : s
}

export function formatHowOut(
  dismissal: Dismissal | undefined,
  bowler?: string,
  fielder?: string,
): string {
  const b = bowler?.trim()
  const f = fielder?.trim()
  switch (dismissal) {
    case 'bowled':
      return b ? `b ${b}` : 'bowled'
    case 'caught':
      if (f && b && f.toLowerCase() === b.toLowerCase()) return `c & b ${b}`
      if (f && b) return `c ${f} b ${b}`
      if (b) return `c b ${b}`
      return f ? `c ${f}` : 'caught'
    case 'lbw':
      return b ? `lbw b ${b}` : 'lbw'
    case 'run out':
      return f ? `run out (${f})` : 'run out'
    case 'stumped':
      if (f && b) return `st ${f} b ${b}`
      if (b) return `st b ${b}`
      return f ? `st ${f}` : 'stumped'
    case 'hit wicket':
      return b ? `hit wicket b ${b}` : 'hit wicket'
    default:
      return b ? `b ${b}` : 'out'
  }
}

function summarise(m: Match, no: InningsNo, target: number | null): InningsSummary {
  const balls = m.balls.filter((b) => b.innings === no)
  const battingTeam = no === 1 ? m.battingFirst : other(m.battingFirst)
  const maxBalls = m.oversPerInnings * 6
  const maxWickets = m.playersPerSide - 1
  const extras = { wd: 0, nb: 0, b: 0, lb: 0, total: 0 }
  let runs = 0
  let wickets = 0
  let legalBalls = 0
  let fours = 0
  let sixes = 0
  const overs_: Ball[][] = []
  const cumulativeByOver: number[] = []
  let current: Ball[] = []

  interface BatterStats {
    batter: string
    runs: number
    ballsFaced: number
    fours: number
    sixes: number
    howOut: string
  }
  const batterMap = new Map<string, BatterStats>()

  function getOrCreateBatter(name: string): BatterStats {
    let entry = batterMap.get(name)
    if (!entry) {
      entry = {
        batter: name,
        runs: 0,
        ballsFaced: 0,
        fours: 0,
        sixes: 0,
        howOut: 'not out',
      }
      batterMap.set(name, entry)
    }
    return entry
  }

  interface BowlerStats {
    bowler: string
    legalBalls: number
    maidens: number
    runsConceded: number
    wickets: number
  }
  const bowlerMap = new Map<string, BowlerStats>()

  function getOrCreateBowler(name: string): BowlerStats {
    let entry = bowlerMap.get(name)
    if (!entry) {
      entry = {
        bowler: name,
        legalBalls: 0,
        maidens: 0,
        runsConceded: 0,
        wickets: 0,
      }
      bowlerMap.set(name, entry)
    }
    return entry
  }

  for (const b of balls) {
    const total = ballTotal(b)
    runs += total
    if (b.wicket) wickets++
    current.push(b)
    if (b.extra === 'wd') extras.wd += total
    else if (b.extra === 'nb') {
      extras.nb += 1
    } else if (b.extra === 'b') extras.b += b.runs
    else if (b.extra === 'lb') extras.lb += b.runs
    if (b.extra === null || b.extra === 'nb') {
      if (b.runs === 4) fours++
      if (b.runs === 6) sixes++
    }
    if (isLegal(b)) {
      legalBalls++
      if (legalBalls % 6 === 0) {
        overs_.push(current)
        cumulativeByOver.push(runs)
        current = []
      }
    }

    // Batting stats
    if (b.batter && b.batter.trim()) {
      const btr = getOrCreateBatter(b.batter.trim())
      if (b.extra !== 'wd') {
        btr.ballsFaced++
      }
      if (b.extra === null || b.extra === 'nb') {
        btr.runs += b.runs
        if (b.runs === 4) btr.fours++
        if (b.runs === 6) btr.sixes++
      }
      if (b.wicket) {
        btr.howOut = formatHowOut(b.dismissal, b.bowler, b.fielder)
      }
    }

    // Bowling stats
    if (b.bowler && b.bowler.trim()) {
      const bwl = getOrCreateBowler(b.bowler.trim())
      if (isLegal(b)) {
        bwl.legalBalls++
      }
      if (b.extra === 'wd' || b.extra === 'nb') {
        bwl.runsConceded += b.runs + 1
      } else if (b.extra === null) {
        bwl.runsConceded += b.runs
      }
      if (b.wicket && b.dismissal !== 'run out') {
        bwl.wickets++
      }
    }
  }
  if (current.length) {
    overs_.push(current)
    cumulativeByOver.push(runs)
  }
  extras.total = extras.wd + extras.nb + extras.b + extras.lb

  // Calculate maidens
  for (const overBalls of overs_) {
    const legalCount = overBalls.filter(isLegal).length
    if (legalCount === 6) {
      const bowlersInOver = new Set(
        overBalls
          .map((b) => b.bowler?.trim())
          .filter(Boolean) as string[],
      )
      for (const bName of bowlersInOver) {
        const bowlerBalls = overBalls.filter((b) => b.bowler?.trim() === bName)
        const bowlerLegal = bowlerBalls.filter(isLegal).length
        const bowlerRuns = bowlerBalls.reduce((sum, b) => {
          if (b.extra === 'wd' || b.extra === 'nb') return sum + b.runs + 1
          if (b.extra === null) return sum + b.runs
          return sum
        }, 0)
        if (bowlerLegal === 6 && bowlerRuns === 0) {
          const bs = bowlerMap.get(bName)
          if (bs) bs.maidens++
        }
      }
    }
  }

  // Include on-field batters for active innings if batting stats are in use or match starting
  const hasBatterData = balls.some((b) => b.batter && b.batter.trim())
  const isInningsCurrent = (no === 1 && !m.balls.some((b) => b.innings === 2)) || no === 2
  if (isInningsCurrent && (hasBatterData || balls.length === 0)) {
    if (m.onField.striker?.trim()) getOrCreateBatter(m.onField.striker.trim())
    if (m.onField.nonStriker?.trim()) getOrCreateBatter(m.onField.nonStriker.trim())
  }

  const batting: BattingRow[] = Array.from(batterMap.values()).map((bs) => ({
    ...bs,
    strikeRate: bs.ballsFaced ? (bs.runs / bs.ballsFaced) * 100 : 0,
  }))

  const bowling: BowlingRow[] = Array.from(bowlerMap.values()).map((bs) => ({
    bowler: bs.bowler,
    overs: formatOvers(bs.legalBalls),
    maidens: bs.maidens,
    runsConceded: bs.runsConceded,
    wickets: bs.wickets,
    economy: bs.legalBalls ? (bs.runsConceded / bs.legalBalls) * 6 : 0,
  }))

  const complete =
    m.closedInnings.includes(no) ||
    legalBalls >= maxBalls ||
    wickets >= maxWickets ||
    (target !== null && runs >= target)

  return {
    no,
    battingTeam,
    runs,
    wickets,
    legalBalls,
    overs: formatOvers(legalBalls),
    runRate: legalBalls ? (runs / legalBalls) * 6 : 0,
    fours,
    sixes,
    extras,
    cumulativeByOver,
    overs_,
    complete,
    batting,
    bowling,
  }
}

export function computeState(m: Match): MatchState {
  const first = summarise(m, 1, null)
  const target = first.complete ? first.runs + 1 : null
  const second = summarise(m, 2, target)
  const secondStarted = m.balls.some((b) => b.innings === 2)

  let status: MatchStatus
  if (m.balls.length === 0 && !first.complete) status = 'not-started'
  else if (!first.complete) status = 'innings-1'
  else if (second.complete) status = 'completed'
  else if (!secondStarted) status = 'innings-break'
  else status = 'innings-2'

  const currentInnings: InningsNo = first.complete ? 2 : 1
  const maxBalls = m.oversPerInnings * 6

  let requiredRuns: number | null = null
  let ballsRemaining: number | null = null
  let requiredRunRate: number | null = null
  if (target !== null && status !== 'completed') {
    requiredRuns = Math.max(0, target - second.runs)
    ballsRemaining = maxBalls - second.legalBalls
    requiredRunRate = ballsRemaining > 0 ? (requiredRuns / ballsRemaining) * 6 : null
  }

  let result: string | null = null
  if (status === 'completed') {
    const chasing = teamName(m, second.battingTeam)
    const defending = teamName(m, first.battingTeam)
    if (second.runs >= (target ?? Infinity)) {
      const left = m.playersPerSide - 1 - second.wickets
      result = `${chasing} won by ${left} wicket${left === 1 ? '' : 's'}`
    } else if (second.runs === first.runs) {
      result = 'Match tied'
    } else {
      const by = first.runs - second.runs
      result = `${defending} won by ${by} run${by === 1 ? '' : 's'}`
    }
  }

  return {
    status,
    currentInnings,
    innings: [first, second],
    target,
    requiredRuns,
    ballsRemaining,
    requiredRunRate,
    result,
  }
}

/** Batters change ends when they complete an odd number of runs. */
export const strikerShouldRotate = (b: Pick<Ball, 'runs'>) => b.runs % 2 === 1

export const newBallId = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
