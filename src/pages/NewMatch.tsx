import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useAuth } from '../lib/auth'
import type { TeamKey } from '../lib/cricket'
import { createMatch } from '../lib/store'

const PRESETS = [
  { label: 'T10', overs: 10 },
  { label: 'T20', overs: 20 },
  { label: 'ODI', overs: 50 },
  { label: '6-over', overs: 6 },
]

export default function NewMatch() {
  const { user, loading } = useAuth()
  const nav = useNavigate()
  const [title, setTitle] = useState('Friendly match')
  const [venue, setVenue] = useState('')
  const [teamA, setTeamA] = useState('')
  const [teamB, setTeamB] = useState('')
  const [overs, setOvers] = useState(20)
  const [players, setPlayers] = useState(11)
  const [battingFirst, setBattingFirst] = useState<TeamKey>('A')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const id = await createMatch(user, {
        title: title.trim() || 'Match',
        venue: venue.trim(),
        teamA: teamA.trim() || 'Home',
        teamB: teamB.trim() || 'Visitors',
        battingFirst,
        oversPerInnings: overs,
        playersPerSide: players,
        onField: { striker: '', nonStriker: '', bowler: '' },
      })
      nav(`/match/${id}/score`)
    } catch (err) {
      setError((err as Error).message)
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">New match</h1>
      <div className="card grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="title">Match title</label>
          <input id="title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="ICC World Cup — Group A" />
        </div>
        <div>
          <label className="label" htmlFor="ta">Home team</label>
          <input id="ta" className="input" value={teamA} onChange={(e) => setTeamA(e.target.value)} placeholder="Sri Lanka" required />
        </div>
        <div>
          <label className="label" htmlFor="tb">Visiting team</label>
          <input id="tb" className="input" value={teamB} onChange={(e) => setTeamB(e.target.value)} placeholder="India" required />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="venue">Venue (optional)</label>
          <input id="venue" className="input" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="R. Premadasa Stadium" />
        </div>
      </div>

      <div className="card space-y-4">
        <div>
          <span className="label">Format</span>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button type="button" key={p.label} onClick={() => setOvers(p.overs)} className={overs === p.overs ? 'btn-primary' : 'btn-ghost'}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="overs">Overs per innings</label>
            <input id="overs" type="number" min={1} max={100} className="input" value={overs} onChange={(e) => setOvers(Math.max(1, +e.target.value || 1))} />
          </div>
          <div>
            <label className="label" htmlFor="players">Players per side</label>
            <input id="players" type="number" min={2} max={15} className="input" value={players} onChange={(e) => setPlayers(Math.min(15, Math.max(2, +e.target.value || 2)))} />
          </div>
        </div>
        <div>
          <span className="label">Who bats first?</span>
          <div className="grid grid-cols-2 gap-2">
            {(['A', 'B'] as const).map((k) => (
              <button type="button" key={k} onClick={() => setBattingFirst(k)} className={battingFirst === k ? 'btn-primary' : 'btn-ghost'}>
                {(k === 'A' ? teamA : teamB) || (k === 'A' ? 'Home team' : 'Visiting team')}
              </button>
            ))}
          </div>
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={busy} className="btn-primary w-full py-3 text-base">
        {busy ? 'Creating…' : 'Create match & start scoring'}
      </button>
    </form>
  )
}
