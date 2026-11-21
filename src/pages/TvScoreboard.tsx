import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import QRCode from 'qrcode'
import { BallChip, StatusBadge } from '../components/ScoreParts'
import { formatToss, teamName } from '../lib/cricket'
import { useMatch } from '../lib/useMatch'

export default function TvScoreboard() {
  const { id } = useParams()
  const { match: m, state, error, loading } = useMatch(id)
  const [qrUrl, setQrUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const url = window.location.origin + `/match/${id}`
    QRCode.toDataURL(url, {
      width: 140,
      margin: 1,
      color: { dark: '#ffffff', light: '#090d16' },
    })
      .then(setQrUrl)
      .catch(() => {})
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-2xl font-bold text-slate-400">
        Loading TV Scoreboard…
      </div>
    )
  }

  if (error || !m || !state) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 text-white">
        <p className="text-xl text-red-400">{error || 'Match not found.'}</p>
        <Link to="/" className="btn-ghost">Back home</Link>
      </div>
    )
  }

  const cur = state.innings[state.currentInnings - 1]
  const battingTeam = teamName(m, cur.battingTeam)
  const bowlingTeam = teamName(m, cur.battingTeam === 'A' ? 'B' : 'A')
  const completed = state.status === 'completed'
  const inningsBreak = state.status === 'innings-break'

  // Last 6 balls across current innings
  const inningsBalls = m.balls.filter((b) => b.innings === cur.no)
  const last6Balls = inningsBalls.slice(-6)

  // Current batters from batting table if available
  const strikerStats = cur.batting.find((b) => b.batter.toLowerCase() === m.onField.striker.toLowerCase())
  const nonStrikerStats = cur.batting.find((b) => b.batter.toLowerCase() === m.onField.nonStriker.toLowerCase())
  const bowlerStats = cur.bowling.find((b) => b.bowler.toLowerCase() === m.onField.bowler.toLowerCase())

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-slate-950 p-6 text-white select-none sm:p-10 md:p-14">
      {/* Top Bar */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-slate-300 sm:text-2xl">{m.title}</h1>
            <StatusBadge state={state} />
          </div>
          <div className="flex flex-wrap items-center gap-x-3 text-sm text-slate-400">
            {m.venue && <span>📍 {m.venue}</span>}
            <span>• {m.oversPerInnings} overs per side</span>
            {m.toss && <span className="text-emerald-400">🪙 {formatToss(m)}</span>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/match/${m.id}`}
            className="rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800 transition"
          >
            ← Exit TV mode
          </Link>
          {qrUrl && (
            <div className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-1.5">
              <img src={qrUrl} alt="Scan QR code" className="h-12 w-12 rounded" />
              <div className="pr-2 text-[10px] text-slate-400 leading-tight">
                Scan for<br /><b className="text-white">Mobile View</b>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Score Centerpiece */}
      <main className="my-auto py-8">
        {!completed && !inningsBreak ? (
          <div className="space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <span className="text-sm font-bold uppercase tracking-widest text-emerald-400">Batting</span>
                <div className="text-4xl font-black text-white sm:text-6xl md:text-7xl">{battingTeam}</div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Bowling</span>
                <div className="text-2xl font-bold text-slate-300 sm:text-4xl">{bowlingTeam}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <div className="tabular text-7xl font-black tracking-tight text-white sm:text-8xl md:text-9xl">
                {cur.runs}
                <span className="text-emerald-500">/{cur.wickets}</span>
              </div>
              <div className="text-3xl font-semibold tabular text-slate-400 sm:text-4xl md:text-5xl">
                ({cur.overs} <span className="text-xl sm:text-2xl text-slate-600">/ {m.oversPerInnings} ov</span>)
              </div>
            </div>

            {/* Run Rates & Target Equation */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-lg sm:text-xl text-slate-300">
              <div>
                CRR: <b className="text-white">{cur.runRate.toFixed(2)}</b>
              </div>
              {state.target !== null && (
                <>
                  <div>
                    Target: <b className="text-emerald-400">{state.target}</b>
                  </div>
                  {state.requiredRunRate !== null && (
                    <div>
                      RRR: <b className="text-amber-400">{state.requiredRunRate.toFixed(2)}</b>
                    </div>
                  )}
                </>
              )}
            </div>

            {state.status === 'innings-2' && state.requiredRuns !== null && (
              <div className="inline-block rounded-2xl bg-emerald-500/15 border border-emerald-500/30 px-6 py-3 text-xl font-bold text-emerald-300 sm:text-2xl">
                Need {state.requiredRuns} run{state.requiredRuns === 1 ? '' : 's'} from {state.ballsRemaining} ball{state.ballsRemaining === 1 ? '' : 's'}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 text-center">
            {completed ? (
              <>
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">Final Result</div>
                <div className="text-5xl font-black text-white sm:text-7xl md:text-8xl">{state.result}</div>
              </>
            ) : (
              <>
                <div className="text-xs font-bold uppercase tracking-widest text-amber-400">Innings Break</div>
                <div className="text-4xl font-black text-white sm:text-6xl">
                  {teamName(m, state.innings[1].battingTeam)} need {state.target} to win
                </div>
              </>
            )}
          </div>
        )}

        {/* Players on field */}
        {!completed && (m.onField.striker || m.onField.nonStriker || m.onField.bowler) && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Batters at Crease</span>
              <div className="mt-2 space-y-1 text-lg">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-emerald-300">{m.onField.striker || '—'} *</span>
                  {strikerStats && (
                    <span className="tabular font-semibold text-slate-300">
                      {strikerStats.runs} <span className="text-sm font-normal text-slate-500">({strikerStats.ballsFaced})</span>
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-slate-300">{m.onField.nonStriker || '—'}</span>
                  {nonStrikerStats && (
                    <span className="tabular font-semibold text-slate-300">
                      {nonStrikerStats.runs} <span className="text-sm font-normal text-slate-500">({nonStrikerStats.ballsFaced})</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Bowler</span>
              <div className="mt-2 text-lg">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-white">{m.onField.bowler || '—'}</span>
                  {bowlerStats && (
                    <span className="tabular font-semibold text-slate-300">
                      {bowlerStats.wickets}/{bowlerStats.runsConceded}{' '}
                      <span className="text-sm font-normal text-slate-500">({bowlerStats.overs} ov)</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Bar: Last 6 Balls Strip */}
      <footer className="border-t border-slate-800/80 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Last 6 Balls:</span>
            <div className="flex flex-wrap gap-2">
              {last6Balls.map((b) => (
                <BallChip key={b.id} ball={b} />
              ))}
              {!last6Balls.length && <span className="text-sm text-slate-600">No balls bowled yet</span>}
            </div>
          </div>

          <div className="text-xs text-slate-500">
            ScoreBoard Live • Auto-updating
          </div>
        </div>
      </footer>
    </div>
  )
}
