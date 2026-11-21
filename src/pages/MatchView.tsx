import { useState } from 'react'
import { Link, useParams } from 'react-router'
import LiveCard from '../components/LiveCard'
import { InningsStats, WormChart } from '../components/ScoreParts'
import { useAuth } from '../lib/auth'
import { useMatch } from '../lib/useMatch'

export default function MatchView() {
  const { id } = useParams()
  const { user } = useAuth()
  const { match: m, state, error, loading } = useMatch(id)
  const [copied, setCopied] = useState(false)

  if (loading) return <div className="card animate-pulse text-sm text-slate-500">Loading scoreboard…</div>
  if (error) return <div className="card text-sm text-red-600">{error}</div>
  if (!m || !state) return <div className="card">Match not found. <Link to="/" className="underline">Back home</Link></div>

  const share = async () => {
    const url = location.href.replace(/\/score$/, '')
    try {
      if (navigator.share) await navigator.share({ title: `${m.teamA} vs ${m.teamB}`, url })
      else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      /* user cancelled */
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="mr-auto text-xl font-bold">
          {m.teamA} <span className="text-slate-400">vs</span> {m.teamB}
        </h1>
        <button onClick={share} className="btn-ghost">{copied ? 'Link copied ✓' : 'Share'}</button>
        {user?.uid === m.ownerId && (
          <Link to={`/match/${m.id}/score`} className="btn-primary">Open scorer</Link>
        )}
      </div>
      <LiveCard m={m} state={state} />
      <div className="card">
        <h2 className="mb-2 font-semibold">Runs per over</h2>
        <WormChart m={m} state={state} />
        {!m.balls.length && <p className="text-sm text-slate-500">The chart appears once the first ball is bowled.</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {state.innings
          .filter((inn) => inn.no === 1 || m.balls.some((b) => b.innings === 2))
          .map((inn) => (
            <InningsStats key={inn.no} m={m} inn={inn} />
          ))}
      </div>
    </div>
  )
}
