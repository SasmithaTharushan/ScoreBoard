import type { Ball, InningsSummary, Match, MatchState } from '../lib/cricket'
import { ballLabel, other, teamName } from '../lib/cricket'

export function BallChip({ ball, size = 'md' }: { ball: Ball; size?: 'sm' | 'md' }) {
  const label = ballLabel(ball)
  let tone = 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
  if (ball.wicket) tone = 'bg-red-600 text-white'
  else if (ball.extra === null && ball.runs === 6) tone = 'bg-violet-600 text-white'
  else if (ball.extra === null && ball.runs === 4) tone = 'bg-blue-600 text-white'
  else if (ball.extra) tone = 'bg-amber-200 text-amber-900 dark:bg-amber-800/60 dark:text-amber-100'
  const dim = size === 'sm' ? 'h-7 min-w-7 text-[11px]' : 'h-9 min-w-9 text-xs'
  return (
    <span className={`inline-flex items-center justify-center rounded-full px-1.5 font-bold tabular ${dim} ${tone}`}>
      {label}
    </span>
  )
}

export function StatusBadge({ state }: { state: MatchState }) {
  const map = {
    'not-started': ['Not started', 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'],
    'innings-1': ['● Live', 'bg-red-600 text-white animate-pulse'],
    'innings-break': ['Innings break', 'bg-amber-500 text-white'],
    'innings-2': ['● Live', 'bg-red-600 text-white animate-pulse'],
    completed: ['Completed', 'bg-emerald-600 text-white'],
  } as const
  const [text, cls] = map[state.status]
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${cls}`}>{text}</span>
  )
}

export function InningsLine({ m, inn, active }: { m: Match; inn: InningsSummary; active?: boolean }) {
  const started = inn.legalBalls > 0 || m.balls.some((b) => b.innings === inn.no)
  return (
    <div className={`flex items-baseline justify-between gap-3 ${active ? '' : 'opacity-70'}`}>
      <span className="truncate font-semibold">{teamName(m, inn.battingTeam)}</span>
      <span className="tabular whitespace-nowrap">
        {started ? (
          <>
            <b className="text-lg">
              {inn.runs}/{inn.wickets}
            </b>{' '}
            <span className="text-sm text-slate-500">({inn.overs})</span>
          </>
        ) : (
          <span className="text-sm text-slate-500">Yet to bat</span>
        )}
      </span>
    </div>
  )
}

/** "Worm" chart: cumulative runs per over for both innings. */
export function WormChart({ m, state }: { m: Match; state: MatchState }) {
  const series = state.innings.filter((i) => i.cumulativeByOver.length)
  if (!series.length) return null
  const W = 600
  const H = 220
  const pad = { l: 36, r: 12, t: 12, b: 26 }
  const maxOver = m.oversPerInnings
  const maxRuns = Math.max(10, ...series.flatMap((s) => s.cumulativeByOver))
  const step = Math.max(5, Math.ceil(maxRuns / 4 / 5) * 5)
  const niceMax = step * 4
  const x = (o: number) => pad.l + (o / maxOver) * (W - pad.l - pad.r)
  const y = (r: number) => H - pad.b - (r / niceMax) * (H - pad.t - pad.b)
  const colors = ['#10b981', '#f97316']
  const yTicks = [0, 1, 2, 3, 4].map((i) => i * step)
  const xStep = maxOver <= 10 ? 1 : maxOver <= 20 ? 2 : 5
  const xTicks = Array.from({ length: Math.floor(maxOver / xStep) + 1 }, (_, i) => i * xStep)
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Runs per over chart">
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} className="stroke-slate-200 dark:stroke-slate-800" />
            <text x={pad.l - 6} y={y(t) + 4} textAnchor="end" className="fill-slate-500 text-[11px]">
              {t}
            </text>
          </g>
        ))}
        {xTicks.map((t) => (
          <text key={t} x={x(t)} y={H - 8} textAnchor="middle" className="fill-slate-500 text-[11px]">
            {t}
          </text>
        ))}
        {series.map((s) => {
          const pts = [[0, 0], ...s.cumulativeByOver.map((r, i) => [i + 1, r])]
          // the last point of an unfinished over sits at its fractional position
          const partial = s.legalBalls % 6
          if (partial) pts[pts.length - 1][0] = Math.floor(s.legalBalls / 6) + partial / 6
          const color = colors[s.no - 1]
          return (
            <g key={s.no}>
              <polyline
                fill="none"
                stroke={color}
                strokeWidth={2.5}
                strokeLinejoin="round"
                points={pts.map(([o, r]) => `${x(o)},${y(r)}`).join(' ')}
              />
              {pts.slice(1).map(([o, r], i) => (
                <circle key={i} cx={x(o)} cy={y(r)} r={2.5} fill={color}>
                  <title>{`Over ${Math.ceil(o)}: ${r} runs`}</title>
                </circle>
              ))}
            </g>
          )
        })}
      </svg>
      <div className="mt-1 flex justify-center gap-4 text-xs">
        {series.map((s) => (
          <span key={s.no} className="flex items-center gap-1.5">
            <span className="h-2 w-4 rounded" style={{ background: colors[s.no - 1] }} />
            {teamName(m, s.battingTeam)}
          </span>
        ))}
      </div>
    </div>
  )
}

export function InningsStats({ m, inn }: { m: Match; inn: InningsSummary }) {
  const rows: [string, string | number][] = [
    ['Score', `${inn.runs}/${inn.wickets}`],
    ['Overs', `${inn.overs} / ${m.oversPerInnings}`],
    ['Run rate', inn.runRate.toFixed(2)],
    ['Fours', inn.fours],
    ['Sixes', inn.sixes],
    [
      'Extras',
      `${inn.extras.total} (wd ${inn.extras.wd}, nb ${inn.extras.nb}, b ${inn.extras.b}, lb ${inn.extras.lb})`,
    ],
  ]
  return (
    <div className="card">
      <h3 className="mb-2 font-semibold">
        {inn.no === 1 ? '1st' : '2nd'} innings · {teamName(m, inn.battingTeam)}
      </h3>
      <dl className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 py-1.5">
            <dt className="text-slate-500">{k}</dt>
            <dd className="tabular text-right font-medium">{v}</dd>
          </div>
        ))}
      </dl>
      {inn.overs_.length > 0 && (
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer text-slate-500">Over by over</summary>
          <ol className="mt-2 space-y-1.5">
            {inn.overs_.map((o, i) => (
              <li key={i} className="flex flex-wrap items-center gap-1">
                <span className="w-12 text-xs text-slate-500">Ov {i + 1}</span>
                {o.map((b) => (
                  <BallChip key={b.id} ball={b} size="sm" />
                ))}
                <span className="ml-auto text-xs tabular text-slate-500">{inn.cumulativeByOver[i]}</span>
              </li>
            ))}
          </ol>
        </details>
      )}
    </div>
  )
}

export function ScorecardTable({ m, inn }: { m: Match; inn: InningsSummary }) {
  const battingTeam = teamName(m, inn.battingTeam)
  const bowlingTeam = teamName(m, inn.no === 1 ? other(m.battingFirst) : m.battingFirst)
  const hasBatting = inn.batting.length > 0
  const hasBowling = inn.bowling.length > 0

  return (
    <div className="card space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-100 pb-2 dark:border-slate-800">
        <h3 className="font-bold">
          {inn.no === 1 ? '1st' : '2nd'} innings — {battingTeam} Batting
        </h3>
        <span className="tabular font-semibold">
          {inn.runs}/{inn.wickets} <span className="text-sm font-normal text-slate-500">({inn.overs} ov)</span>
        </span>
      </div>

      {/* Batting Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase text-slate-500 dark:border-slate-800">
              <th className="py-2 pr-4 font-semibold">Batter</th>
              <th className="py-2 pr-4 font-semibold">Dismissal</th>
              <th className="py-2 px-2 text-right font-semibold">R</th>
              <th className="py-2 px-2 text-right font-semibold">B</th>
              <th className="py-2 px-2 text-right font-semibold">4s</th>
              <th className="py-2 px-2 text-right font-semibold">6s</th>
              <th className="py-2 pl-2 text-right font-semibold">SR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {hasBatting ? (
              inn.batting.map((b) => (
                <tr key={b.batter}>
                  <td className="py-2 pr-4 font-medium">{b.batter}</td>
                  <td className="py-2 pr-4 text-xs text-slate-500">{b.howOut}</td>
                  <td className="py-2 px-2 text-right font-bold tabular">{b.runs}</td>
                  <td className="py-2 px-2 text-right tabular text-slate-500">{b.ballsFaced}</td>
                  <td className="py-2 px-2 text-right tabular text-slate-500">{b.fours}</td>
                  <td className="py-2 px-2 text-right tabular text-slate-500">{b.sixes}</td>
                  <td className="py-2 pl-2 text-right tabular text-slate-500">{b.strikeRate.toFixed(1)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-3 text-center text-xs text-slate-500">
                  No batting data recorded yet.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="border-t border-slate-200 text-xs text-slate-500 dark:border-slate-800">
              <td colSpan={2} className="py-2 font-medium">
                Extras: {inn.extras.total} (wd {inn.extras.wd}, nb {inn.extras.nb}, b {inn.extras.b}, lb {inn.extras.lb}
                )
              </td>
              <td colSpan={5} className="py-2 text-right font-bold tabular text-slate-700 dark:text-slate-300">
                Total: {inn.runs}/{inn.wickets} ({inn.overs} ov)
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Bowling Table */}
      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {bowlingTeam} Bowling
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase text-slate-500 dark:border-slate-800">
                <th className="py-2 pr-4 font-semibold">Bowler</th>
                <th className="py-2 px-2 text-right font-semibold">O</th>
                <th className="py-2 px-2 text-right font-semibold">M</th>
                <th className="py-2 px-2 text-right font-semibold">R</th>
                <th className="py-2 px-2 text-right font-semibold">W</th>
                <th className="py-2 pl-2 text-right font-semibold">Econ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {hasBowling ? (
                inn.bowling.map((bw) => (
                  <tr key={bw.bowler}>
                    <td className="py-2 pr-4 font-medium">{bw.bowler}</td>
                    <td className="py-2 px-2 text-right tabular">{bw.overs}</td>
                    <td className="py-2 px-2 text-right tabular text-slate-500">{bw.maidens}</td>
                    <td className="py-2 px-2 text-right tabular text-slate-500">{bw.runsConceded}</td>
                    <td className="py-2 px-2 text-right font-bold tabular">{bw.wickets}</td>
                    <td className="py-2 pl-2 text-right tabular text-slate-500">{bw.economy.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-3 text-center text-xs text-slate-500">
                    No bowling data recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
