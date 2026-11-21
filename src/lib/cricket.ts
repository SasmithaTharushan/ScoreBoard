// Pure cricket scoring engine. Every number on the scoreboard is derived from the
// ball-by-ball log, so there are no separate counters that can drift out of sync.

export type Extra = 'wd' | 'nb' | 'b' | 'lb' | null
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
  }
  if (current.length) {
    overs_.push(current)
    cumulativeByOver.push(runs)
  }
  extras.total = extras.wd + extras.nb + extras.b + extras.lb

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
