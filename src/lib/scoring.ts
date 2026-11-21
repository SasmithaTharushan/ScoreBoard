// State transitions used by the scorer panel. Kept pure so they can be unit-tested.
import { computeState, isLegal, newBallId, strikerShouldRotate, type Ball, type Extra, type Match } from './cricket'

export interface Delivery {
  runs: number
  extra: Extra
  wicket: boolean
}

export function addBall(m: Match, d: Delivery, now = Date.now()): Partial<Match> {
  const state = computeState(m)
  if (state.status === 'completed') throw new Error('The match is already over')
  const ball: Ball = { id: newBallId(), innings: state.currentInnings, runs: d.runs, extra: d.extra, wicket: d.wicket, t: now }

  let { striker, nonStriker, bowler } = m.onField
  if (state.status === 'innings-break') {
    // first ball of the chase: field names belong to the previous innings
    striker = nonStriker = bowler = ''
  }
  if (strikerShouldRotate(ball)) [striker, nonStriker] = [nonStriker, striker]
  if (ball.wicket) striker = ''
  const balls = [...m.balls, ball]
  const legalInInnings = balls.filter((b) => b.innings === ball.innings && isLegal(b)).length
  if (isLegal(ball) && legalInInnings % 6 === 0) {
    ;[striker, nonStriker] = [nonStriker, striker]
    bowler = ''
  }
  return { balls, onField: { striker, nonStriker, bowler } }
}

/** Undo the last action: re-open a manually closed innings, otherwise remove the last ball. */
export function undo(m: Match): Partial<Match> {
  const lastBallInnings = m.balls.length ? m.balls[m.balls.length - 1].innings : 0
  const closed = [...m.closedInnings].sort()
  const lastClosed = closed[closed.length - 1]
  if (lastClosed && lastClosed >= lastBallInnings) {
    return { closedInnings: closed.slice(0, -1) }
  }
  if (!m.balls.length) return {}
  return { balls: m.balls.slice(0, -1) }
}

export function closeInnings(m: Match): Partial<Match> {
  const state = computeState(m)
  if (state.status === 'completed') return {}
  const no = state.currentInnings
  if (m.closedInnings.includes(no)) return {}
  return { closedInnings: [...m.closedInnings, no], onField: { striker: '', nonStriker: '', bowler: '' } }
}
