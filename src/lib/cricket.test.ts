import { describe, expect, it } from 'vitest'
import { ballLabel, computeState, type Match } from './cricket'
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
})
