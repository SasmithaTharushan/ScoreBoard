import { useEffect, useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useAuth } from '../lib/auth'
import type { TeamKey, Toss } from '../lib/cricket'
import { createMatch, saveTeam, subscribeTeams, type Team } from '../lib/store'

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
  const [teamAPlayersText, setTeamAPlayersText] = useState('')
  const [teamBPlayersText, setTeamBPlayersText] = useState('')
  const [saveTeamA, setSaveTeamA] = useState(false)
  const [saveTeamB, setSaveTeamB] = useState(false)
  const [savedTeams, setSavedTeams] = useState<Team[]>([])
  const [overs, setOvers] = useState(20)
  const [players, setPlayers] = useState(11)
  const [hasToss, setHasToss] = useState(false)
  const [tossWinner, setTossWinner] = useState<TeamKey>('A')
  const [tossDecision, setTossDecision] = useState<'bat' | 'bowl'>('bat')
  const [battingFirst, setBattingFirst] = useState<TeamKey>('A')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    return subscribeTeams(setSavedTeams)
  }, [])

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />

  const handlePickTeam = (side: 'A' | 'B', teamId: string) => {
    const selected = savedTeams.find((t) => t.id === teamId)
    if (!selected) return
    if (side === 'A') {
      setTeamA(selected.name)
      setTeamAPlayersText(selected.players.join(', '))
    } else {
      setTeamB(selected.name)
      setTeamBPlayersText(selected.players.join(', '))
    }
  }

  const parsePlayers = (text: string) =>
    text
      .split(/[,\n]/)
      .map((p) => p.trim())
      .filter(Boolean)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const parsedA = parsePlayers(teamAPlayersText)
      const parsedB = parsePlayers(teamBPlayersText)

      // Save teams if requested
      if (saveTeamA && teamA.trim() && parsedA.length) {
        await saveTeam(user, { name: teamA.trim(), players: parsedA })
      }
      if (saveTeamB && teamB.trim() && parsedB.length) {
        await saveTeam(user, { name: teamB.trim(), players: parsedB })
      }

      const effectiveBattingFirst: TeamKey = hasToss
        ? tossDecision === 'bat'
          ? tossWinner
          : tossWinner === 'A'
          ? 'B'
          : 'A'
        : battingFirst

      const toss: Toss | undefined = hasToss
        ? { winner: tossWinner, decision: tossDecision }
        : undefined

      const id = await createMatch(user, {
        title: title.trim() || 'Match',
        venue: venue.trim(),
        teamA: teamA.trim() || 'Home',
        teamB: teamB.trim() || 'Visitors',
        teamAPlayers: parsedA.slice(0, players),
        teamBPlayers: parsedB.slice(0, players),
        toss,
        battingFirst: effectiveBattingFirst,
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

  const listA = parsePlayers(teamAPlayersText)
  const listB = parsePlayers(teamBPlayersText)

  return (
    <form onSubmit={submit} className="mx-auto max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">New match</h1>
      <div className="card grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="title">Match title</label>
          <input id="title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="ICC World Cup — Group A" />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="venue">Venue (optional)</label>
          <input id="venue" className="input" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="R. Premadasa Stadium" />
        </div>

        {/* Team A */}
        <div className="space-y-2 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <label className="label mb-0" htmlFor="ta">Home team *</label>
            {savedTeams.length > 0 && (
              <select
                className="text-xs text-emerald-600 dark:text-emerald-400 bg-transparent outline-none cursor-pointer"
                onChange={(e) => handlePickTeam('A', e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Load saved team...</option>
                {savedTeams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.players.length} players)
                  </option>
                ))}
              </select>
            )}
          </div>
          <input id="ta" className="input" value={teamA} onChange={(e) => setTeamA(e.target.value)} placeholder="e.g. Sri Lanka" required />
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <label className="text-xs text-slate-500" htmlFor="playersA">Squad / Playing XI ({listA.length} players)</label>
              {listA.length > 0 && listA.length !== players && (
                <span className="text-[11px] text-amber-600">Top {players} will be playing XI</span>
              )}
            </div>
            <textarea
              id="playersA"
              className="input h-20 text-xs font-mono"
              placeholder="Enter player names, comma or newline separated..."
              value={teamAPlayersText}
              onChange={(e) => setTeamAPlayersText(e.target.value)}
            />
          </div>
          <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer pt-1">
            <input type="checkbox" checked={saveTeamA} onChange={(e) => setSaveTeamA(e.target.checked)} className="rounded" />
            Save team &amp; roster to My Teams
          </label>
        </div>

        {/* Team B */}
        <div className="space-y-2 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <label className="label mb-0" htmlFor="tb">Visiting team *</label>
            {savedTeams.length > 0 && (
              <select
                className="text-xs text-emerald-600 dark:text-emerald-400 bg-transparent outline-none cursor-pointer"
                onChange={(e) => handlePickTeam('B', e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Load saved team...</option>
                {savedTeams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.players.length} players)
                  </option>
                ))}
              </select>
            )}
          </div>
          <input id="tb" className="input" value={teamB} onChange={(e) => setTeamB(e.target.value)} placeholder="e.g. India" required />
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <label className="text-xs text-slate-500" htmlFor="playersB">Squad / Playing XI ({listB.length} players)</label>
              {listB.length > 0 && listB.length !== players && (
                <span className="text-[11px] text-amber-600">Top {players} will be playing XI</span>
              )}
            </div>
            <textarea
              id="playersB"
              className="input h-20 text-xs font-mono"
              placeholder="Enter player names, comma or newline separated..."
              value={teamBPlayersText}
              onChange={(e) => setTeamBPlayersText(e.target.value)}
            />
          </div>
          <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer pt-1">
            <input type="checkbox" checked={saveTeamB} onChange={(e) => setSaveTeamB(e.target.checked)} className="rounded" />
            Save team &amp; roster to My Teams
          </label>
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
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="label mb-0">Toss &amp; Batting First</span>
            <button
              type="button"
              className="text-xs text-emerald-600 dark:text-emerald-400 underline"
              onClick={() => setHasToss(!hasToss)}
            >
              {hasToss ? 'Skip toss (choose manually)' : '+ Record toss result'}
            </button>
          </div>

          {hasToss ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 dark:border-emerald-900/50 dark:bg-emerald-950/20 space-y-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Who won the toss?</span>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  {(['A', 'B'] as const).map((k) => (
                    <button
                      type="button"
                      key={k}
                      onClick={() => setTossWinner(k)}
                      className={`btn py-2 text-xs font-bold ${
                        tossWinner === k ? 'btn-primary' : 'btn-ghost'
                      }`}
                    >
                      {(k === 'A' ? teamA : teamB) || (k === 'A' ? 'Home' : 'Visiting')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Elected to?</span>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  {(['bat', 'bowl'] as const).map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setTossDecision(d)}
                      className={`btn py-2 text-xs font-bold uppercase ${
                        tossDecision === d ? 'btn-primary' : 'btn-ghost'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                🪙 {(tossWinner === 'A' ? teamA : teamB) || 'Winner'} won the toss and elected to {tossDecision}.
              </p>
            </div>
          ) : (
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
          )}
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={busy} className="btn-primary w-full py-3 text-base">
        {busy ? 'Creating…' : 'Create match & start scoring'}
      </button>
    </form>
  )
}
