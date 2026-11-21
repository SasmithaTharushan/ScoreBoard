import type { Match, MatchState } from '../lib/cricket'
import { teamName } from '../lib/cricket'
import { BallChip, InningsLine, StatusBadge } from './ScoreParts'

export default function LiveCard({ m, state }: { m: Match; state: MatchState }) {
  const cur = state.innings[state.currentInnings - 1]
  const showCurrent = state.status === 'innings-1' || state.status === 'innings-2' || state.status === 'not-started'
  const thisOver = cur.overs_.length && cur.legalBalls % 6 !== 0 ? cur.overs_[cur.overs_.length - 1] : []
  const lastOver = cur.legalBalls % 6 === 0 && cur.overs_.length ? cur.overs_[cur.overs_.length - 1] : null

  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white shadow-lg">
      <div className="flex items-center justify-between gap-3 px-5 pt-4 text-xs text-slate-300">
        <span className="truncate">
          {m.title}
          {m.venue && ` · ${m.venue}`} · {m.oversPerInnings} overs
        </span>
        <StatusBadge state={state} />
      </div>

      {showCurrent ? (
        <div className="px-5 pb-4 pt-3">
          <div className="text-sm font-medium text-emerald-300">{teamName(m, cur.battingTeam)} batting</div>
          <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
            <div className="tabular text-6xl font-black leading-none tracking-tight sm:text-7xl">
              {cur.runs}
              <span className="text-slate-400">/{cur.wickets}</span>
            </div>
            <div className="pb-1 text-lg tabular text-slate-300">
              ({cur.overs}
              <span className="text-slate-500">/{m.oversPerInnings}</span>)
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm tabular text-slate-300">
            <span>
              CRR <b className="text-white">{cur.runRate.toFixed(2)}</b>
            </span>
            {state.target !== null && (
              <>
                <span>
                  Target <b className="text-white">{state.target}</b>
                </span>
                {state.requiredRunRate !== null && (
                  <span>
                    RRR <b className="text-white">{state.requiredRunRate.toFixed(2)}</b>
                  </span>
                )}
              </>
            )}
          </div>
          {state.status === 'innings-2' && state.requiredRuns !== null && (
            <div className="mt-3 rounded-xl bg-white/10 px-3 py-2 text-sm">
              Need <b>{state.requiredRuns}</b> run{state.requiredRuns === 1 ? '' : 's'} from <b>{state.ballsRemaining}</b>{' '}
              ball{state.ballsRemaining === 1 ? '' : 's'}
            </div>
          )}
          {(m.onField.striker || m.onField.nonStriker || m.onField.bowler) && (
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-xl bg-white/5 px-3 py-2">
                <div className="text-[11px] uppercase tracking-wide text-slate-400">Batting</div>
                <div className="truncate">
                  {m.onField.striker && <b>{m.onField.striker}*</b>}
                  {m.onField.nonStriker && <span className="text-slate-300"> · {m.onField.nonStriker}</span>}
                </div>
              </div>
              <div className="rounded-xl bg-white/5 px-3 py-2">
                <div className="text-[11px] uppercase tracking-wide text-slate-400">Bowling</div>
                <div className="truncate">{m.onField.bowler || '—'}</div>
              </div>
            </div>
          )}
          <div className="mt-4">
            <div className="mb-1.5 text-[11px] uppercase tracking-wide text-slate-400">
              {lastOver ? 'Last over' : 'This over'}
            </div>
            <div className="flex min-h-9 flex-wrap gap-1.5">
              {(lastOver ?? thisOver).map((b) => (
                <BallChip key={b.id} ball={b} />
              ))}
              {!(lastOver ?? thisOver).length && <span className="text-sm text-slate-500">No balls yet</span>}
            </div>
          </div>
        </div>
      ) : (
        <div className="px-5 pb-5 pt-4">
          {state.result ? (
            <div className="text-2xl font-black text-emerald-300 sm:text-3xl">{state.result}</div>
          ) : (
            <div className="text-xl font-bold">
              Innings break · {teamName(m, state.innings[1].battingTeam)} need {state.target} to win
            </div>
          )}
        </div>
      )}

      <div className="space-y-1 border-t border-white/10 bg-black/20 px-5 py-3">
        <InningsLine m={m} inn={state.innings[0]} active={state.currentInnings === 1} />
        <InningsLine m={m} inn={state.innings[1]} active={state.currentInnings === 2} />
      </div>
    </section>
  )
}
