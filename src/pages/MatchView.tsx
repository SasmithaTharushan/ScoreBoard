import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import QRCode from 'qrcode'
import LiveCard from '../components/LiveCard'
import { InningsStats, ScorecardTable, WormChart } from '../components/ScoreParts'
import { useAuth } from '../lib/auth'
import { matchToCsv } from '../lib/cricket'
import { useMatch } from '../lib/useMatch'

export default function MatchView() {
  const { id } = useParams()
  const { user } = useAuth()
  const { match: m, state, error, loading } = useMatch(id)
  const [copied, setCopied] = useState(false)
  const [showQr, setShowQr] = useState(false)
  const [qrUrl, setQrUrl] = useState<string | null>(null)

  const matchId = m?.id
  useEffect(() => {
    if (!matchId) return
    const url = window.location.origin + `/match/${matchId}`
    QRCode.toDataURL(url, {
      width: 240,
      margin: 2,
      color: { dark: '#0f172a', light: '#ffffff' },
    })
      .then(setQrUrl)
      .catch(() => {})
  }, [matchId])

  if (loading) return <div className="card animate-pulse text-sm text-slate-500">Loading scoreboard…</div>
  if (error) return <div className="card text-sm text-red-600">{error}</div>
  if (!m || !state)
    return (
      <div className="card">
        Match not found.{' '}
        <Link to="/" className="underline">
          Back home
        </Link>
      </div>
    )

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

  const downloadCsv = () => {
    if (!m) return
    const csvContent = matchToCsv(m)
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${m.teamA}-vs-${m.teamB}-scorecard.csv`.replace(/\s+/g, '-').toLowerCase()
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="mr-auto text-xl font-bold">
          {m.teamA} <span className="text-slate-400">vs</span> {m.teamB}
        </h1>
        <Link to={`/match/${m.id}/tv`} className="btn-ghost" title="Full-screen scoreboard for TV or projector">
          📺 TV mode
        </Link>
        <button onClick={downloadCsv} className="btn-ghost" title="Download ball-by-ball CSV log">
          📥 CSV
        </button>
        <button onClick={() => window.print()} className="btn-ghost" title="Print or save as PDF">
          🖨️ Print / PDF
        </button>
        <button onClick={() => setShowQr(!showQr)} className="btn-ghost">
          {showQr ? 'Hide QR' : '📱 QR'}
        </button>
        <button onClick={share} className="btn-ghost">
          {copied ? 'Link copied ✓' : 'Share'}
        </button>
        {user?.uid === m.ownerId && (
          <Link to={`/match/${m.id}/score`} className="btn-primary">
            Open scorer
          </Link>
        )}
      </div>

      {showQr && (
        <div className="card mx-auto max-w-sm space-y-3 p-6 text-center border-emerald-500/30">
          <h3 className="font-bold">Scan to follow match</h3>
          {qrUrl && (
            <img
              src={qrUrl}
              alt="Match QR Code"
              className="mx-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
            />
          )}
          <p className="text-xs text-slate-500">Scan with your phone's camera to watch this scoreboard live.</p>
          <button onClick={() => setShowQr(false)} className="btn-ghost text-xs py-1">
            Close
          </button>
        </div>
      )}

      <LiveCard m={m} state={state} />
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Scorecard</h2>
        {state.innings
          .filter((inn) => inn.no === 1 || m.balls.some((b) => b.innings === 2))
          .map((inn) => (
            <ScorecardTable key={inn.no} m={m} inn={inn} />
          ))}
      </div>
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
