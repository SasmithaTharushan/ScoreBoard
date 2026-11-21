import { describe, expect, it } from 'vitest'
import { ballLabel, computeState, formatToss, type Match } from './cricket'
import { addBall, closeInnings, undo, type Delivery } from './scoring'

function match(over: Partial<Match> = {}): Match {
  return {
    id: 'm', ownerId: 'u', title: 'Test', venue: '', teamA: 'Sri Lanka', teamB: 'India',
    battingFirst: 'A', oversPerInnings: 2, playersPerSide: 3, balls: [], closedInnings: [],
    onField: { striker: 'S', nonStriker: 'N', bowler: 'B' }, createdAt: 0, updatedAt: 0, ...over,
  }
}
const play = (m: Match, ...ds: Partial<Delivery>[]) =>
  ds.reduce((acc, d) => ({ ...acc, ...addBall(acc, { runs: 0, extra: null, wicket: false, ...d }) }), m)

describe('scoring engine', () => {
  it('counts runs, extras and legal balls', () => {
    const m = play(match(), { runs: 4 }, { extra: 'wd' }, { runs: 2, extra: 'nb' }, { runs: 1, extra: 'lb' }, { runs: 6 })
    const s = computeState(m)
    const inn = s.innings[0]
    expect(inn.runs).toBe(4 + 1 + 3 + 1 + 6)
    expect(inn.legalBalls).toBe(3)
    expect(inn.overs).toBe('0.3')
    expect(inn.extras).toEqual({ wd: 1, nb: 1, b: 0, lb: 1, total: 3 })
    expect(inn.fours).toBe(1)
    expect(inn.sixes).toBe(1)
    expect(s.status).toBe('innings-1')
  })

  it('rotates strike on odd runs and at the end of the over', () => {
    let m = play(match(), { runs: 1 })
    expect(m.onField.striker).toBe('N')
    m = play(m, {}, {}, {}, {}, {}) // completes the over (6 legal balls)
    expect(m.onField).toEqual({ striker: 'S', nonStriker: 'N', bowler: '' })
  })

  it('ends innings on all out and sets a target', () => {
    const m = play(match(), { runs: 6 }, { wicket: true }, { wicket: true })
    const s = computeState(m)
    expect(s.innings[0].complete).toBe(true)
    expect(s.status).toBe('innings-break')
    expect(s.target).toBe(7)
    expect(s.requiredRuns).toBe(7)
    expect(s.ballsRemaining).toBe(12)
  })

  it('finishes the chase and names the winner by wickets', () => {
    let m = play(match(), { runs: 6 }, { wicket: true }, { wicket: true })
    m = play(m, { runs: 4 }, { runs: 4 })
    const s = computeState(m)
    expect(s.status).toBe('completed')
    expect(s.result).toBe('India won by 2 wickets')
    expect(() => addBall(m, { runs: 1, extra: null, wicket: false })).toThrow()
  })

  it('names the winner by runs when overs run out', () => {
    let m = play(match({ oversPerInnings: 1 }), { runs: 6 }, {}, {}, {}, {}, {})
    m = play(m, { runs: 1 }, {}, {}, {}, {}, {})
    expect(computeState(m).result).toBe('Sri Lanka won by 5 runs')
  })

  it('detects a tie', () => {
    let m = play(match({ oversPerInnings: 1 }), { runs: 3 }, {}, {}, {}, {}, {})
    m = play(m, { runs: 3 }, {}, {}, {}, {}, {})
    expect(computeState(m).result).toBe('Match tied')
  })

  it('undo removes the last ball, then re-opens a closed innings', () => {
    let m = play(match(), { runs: 2 }, { runs: 3 })
    m = { ...m, ...undo(m) }
    expect(computeState(m).innings[0].runs).toBe(2)
    m = { ...m, ...closeInnings(m) }
    expect(computeState(m).status).toBe('innings-break')
    m = { ...m, ...undo(m) }
    expect(computeState(m).status).toBe('innings-1')
    expect(m.balls).toHaveLength(1)
  })

  it('labels balls for the over strip', () => {
    const b = { id: 'x', innings: 1 as const, t: 0 }
    expect(ballLabel({ ...b, runs: 0, extra: null, wicket: false })).toBe('•')
    expect(ballLabel({ ...b, runs: 0, extra: null, wicket: true })).toBe('W')
    expect(ballLabel({ ...b, runs: 0, extra: 'wd', wicket: false })).toBe('wd')
    expect(ballLabel({ ...b, runs: 4, extra: 'nb', wicket: false })).toBe('nb4')
    expect(ballLabel({ ...b, runs: 2, extra: 'lb', wicket: false })).toBe('2lb')
  })

  it('fills batter and bowler from match.onField in addBall', () => {
    const m = play(match({ onField: { striker: 'Kusal', nonStriker: 'Pathum', bowler: 'Bumrah' } }), { runs: 4 })
    expect(m.balls[0].batter).toBe('Kusal')
    expect(m.balls[0].bowler).toBe('Bumrah')
  })

  it('computes batting scorecard with balls faced, boundaries and strike rate', () => {
    let m = match({ onField: { striker: 'Kusal', nonStriker: 'Pathum', bowler: 'Bumrah' } })
    m = play(m, { runs: 4 }, { runs: 1 }, { runs: 6 }, { runs: 0 })
    const state = computeState(m)
    const batting = state.innings[0].batting
    expect(batting).toHaveLength(2)

    const kusal = batting.find((b) => b.batter === 'Kusal')!
    expect(kusal.runs).toBe(5)
    expect(kusal.ballsFaced).toBe(2)
    expect(kusal.fours).toBe(1)
    expect(kusal.sixes).toBe(0)
    expect(kusal.strikeRate).toBe(250)
    expect(kusal.howOut).toBe('not out')

    const pathum = batting.find((b) => b.batter === 'Pathum')!
    expect(pathum.runs).toBe(6)
    expect(pathum.ballsFaced).toBe(2)
    expect(pathum.fours).toBe(0)
    expect(pathum.sixes).toBe(1)
    expect(pathum.strikeRate).toBe(300)
    expect(pathum.howOut).toBe('not out')
  })

  it('does not count wides as balls faced or batter runs, but counts no balls, byes and leg byes as balls faced', () => {
    let m = match({ onField: { striker: 'Kusal', nonStriker: 'Pathum', bowler: 'Bumrah' } })
    // Ball 1: wide (team +1, not a ball faced)
    // Ball 2: no ball with 2 runs (team +3, batter +2, 1 ball faced)
    // Ball 3: bye with 2 runs (team +2, batter +0, 1 ball faced, even runs so Kusal stays on strike)
    // Ball 4: leg bye with 2 runs (team +2, batter +0, 1 ball faced)
    m = play(m, { runs: 0, extra: 'wd' }, { runs: 2, extra: 'nb' }, { runs: 2, extra: 'b' }, { runs: 2, extra: 'lb' })
    const state = computeState(m)
    const kusal = state.innings[0].batting.find((b) => b.batter === 'Kusal')!
    expect(kusal.runs).toBe(2)
    expect(kusal.ballsFaced).toBe(3)
  })

  it('records dismissals and formats how out correctly', () => {
    let m = match({ playersPerSide: 11, onField: { striker: 'Kusal', nonStriker: 'Pathum', bowler: 'Bumrah' } })
    m = play(m, { runs: 0, wicket: true, dismissal: 'bowled' })
    let state = computeState(m)
    let kusal = state.innings[0].batting.find((b) => b.batter === 'Kusal')!
    expect(kusal.howOut).toBe('b Bumrah')

    m = { ...m, onField: { ...m.onField, striker: 'Charith' } }
    m = play(m, { runs: 0, wicket: true, dismissal: 'caught', fielder: 'Rohit' })
    state = computeState(m)
    const charith = state.innings[0].batting.find((b) => b.batter === 'Charith')!
    expect(charith.howOut).toBe('c Rohit b Bumrah')
  })

  it('handles caught & bowled, lbw, run out, stumped and hit wicket', () => {
    let m = match({ playersPerSide: 11, onField: { striker: 'A', nonStriker: 'B', bowler: 'Spinner' } })
    m = play(m, { runs: 0, wicket: true, dismissal: 'caught', fielder: 'Spinner' })
    expect(computeState(m).innings[0].batting.find((b) => b.batter === 'A')!.howOut).toBe('c & b Spinner')

    m = { ...m, onField: { ...m.onField, striker: 'C' } }
    m = play(m, { runs: 0, wicket: true, dismissal: 'lbw' })
    expect(computeState(m).innings[0].batting.find((b) => b.batter === 'C')!.howOut).toBe('lbw b Spinner')

    m = { ...m, onField: { ...m.onField, striker: 'D' } }
    m = play(m, { runs: 0, wicket: true, dismissal: 'run out', fielder: 'Jadeja' })
    expect(computeState(m).innings[0].batting.find((b) => b.batter === 'D')!.howOut).toBe('run out (Jadeja)')

    m = { ...m, onField: { ...m.onField, striker: 'E' } }
    m = play(m, { runs: 0, wicket: true, dismissal: 'stumped', fielder: 'Pant' })
    expect(computeState(m).innings[0].batting.find((b) => b.batter === 'E')!.howOut).toBe('st Pant b Spinner')

    m = { ...m, onField: { ...m.onField, striker: 'F' } }
    m = play(m, { runs: 0, wicket: true, dismissal: 'hit wicket' })
    expect(computeState(m).innings[0].batting.find((b) => b.batter === 'F')!.howOut).toBe('hit wicket b Spinner')
  })

  it('computes bowling scorecard with overs, maidens, runs conceded, wickets and economy', () => {
    let m = match({ playersPerSide: 11, oversPerInnings: 5, onField: { striker: 'S', nonStriker: 'N', bowler: 'Bumrah' } })
    m = play(m, { runs: 0 }, { runs: 0 }, { runs: 0 }, { runs: 0 }, { runs: 0 }, { runs: 0 })
    let bwl = computeState(m).innings[0].bowling.find((b) => b.bowler === 'Bumrah')!
    expect(bwl.overs).toBe('1.0')
    expect(bwl.maidens).toBe(1)
    expect(bwl.runsConceded).toBe(0)
    expect(bwl.wickets).toBe(0)
    expect(bwl.economy).toBe(0)

    m = { ...m, onField: { ...m.onField, bowler: 'Bumrah' } }
    m = play(
      m,
      { runs: 0, extra: 'wd' },
      { runs: 4 },
      { runs: 0, wicket: true, dismissal: 'caught', fielder: 'Kohli' },
      { runs: 0, wicket: true, dismissal: 'run out', fielder: 'Jadeja' },
      { runs: 2, extra: 'b' },
      { runs: 0 },
    )
    bwl = computeState(m).innings[0].bowling.find((b) => b.bowler === 'Bumrah')!
    expect(bwl.overs).toBe('1.5')
    expect(bwl.runsConceded).toBe(5)
    expect(bwl.wickets).toBe(1)
    expect(bwl.economy).toBeCloseTo((5 / 11) * 6, 2)
  })

  it('still loads old matches without batter/bowler/dismissal fields cleanly', () => {
    const oldMatch: Match = {
      id: 'old', ownerId: 'u', title: 'Old Match', venue: '', teamA: 'A', teamB: 'B',
      battingFirst: 'A', oversPerInnings: 2, playersPerSide: 3,
      balls: [
        { id: 'b1', innings: 1, runs: 4, extra: null, wicket: false, t: 1000 },
        { id: 'b2', innings: 1, runs: 0, extra: 'wd', wicket: false, t: 2000 },
        { id: 'b3', innings: 1, runs: 0, extra: null, wicket: true, t: 3000 },
      ],
      closedInnings: [],
      onField: { striker: '', nonStriker: '', bowler: '' },
      createdAt: 0, updatedAt: 0,
    }
    const state = computeState(oldMatch)
    expect(state.innings[0].runs).toBe(5)
    expect(state.innings[0].wickets).toBe(1)
    expect(state.innings[0].batting).toEqual([])
    expect(state.innings[0].bowling).toEqual([])
  })

  it('supports team player rosters on match', () => {
    const m = match({
      teamAPlayers: ['Kusal', 'Pathum', 'Charith'],
      teamBPlayers: ['Rohit', 'Gill', 'Kohli'],
    })
    expect(m.teamAPlayers).toEqual(['Kusal', 'Pathum', 'Charith'])
    expect(m.teamBPlayers).toEqual(['Rohit', 'Gill', 'Kohli'])
  })

  it('formats toss result correctly', () => {
    const m1 = match({ toss: { winner: 'A', decision: 'bat' } })
    expect(formatToss(m1)).toBe('Sri Lanka won the toss and chose to bat')

    const m2 = match({ toss: { winner: 'B', decision: 'bowl' } })
    expect(formatToss(m2)).toBe('India won the toss and chose to bowl')

    const m3 = match()
    expect(formatToss(m3)).toBeNull()
  })
})
