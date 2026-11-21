import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router'
import LiveCard from '../components/LiveCard'
import { useAuth } from '../lib/auth'
import { teamName, type Dismissal, type Extra, type OnField } from '../lib/cricket'
import { addBall, closeInnings, undo, type Delivery } from '../lib/scoring'
import { deleteMatch, updateMatch } from '../lib/store'
import { useMatch } from '../lib/useMatch'

const EXTRAS: { key: Exclude<Extra, null>; label: string }[] = [
  { key: 'wd', label: 'Wide' },
  { key: 'nb', label: 'No ball' },
  { key: 'b', label: 'Bye' },
  { key: 'lb', label: 'Leg bye' },
]

const DISMISSALS: { key: NonNullable<Dismissal>; label: string; needsFielder?: boolean }[] = [
  { key: 'bowled', label: 'Bowled' },
  { key: 'caught', label: 'Caught', needsFielder: true },
  { key: 'lbw', label: 'LBW' },
  { key: 'run out', label: 'Run out', needsFielder: true },
  { key: 'stumped', label: 'Stumped', needsFielder: true },
  { key: 'hit wicket', label: 'Hit wicket' },
]

export default function Scorer() {
  const { id } = useParams()
  const nav = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const { match: m, state, error, loading } = useMatch(id)
  const [extra, setExtra] = useState<Extra>(null)
  const [wicket, setWicket] = useState(false)
  const [dismissal, setDismissal] = useState<NonNullable<Dismissal>>('bowled')
  const [fielder, setFielder] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const [field, setField] = useState<OnField>({ striker: '', nonStriker: '', bowler: '' })
  const [manualTyping, setManualTyping] = useState<Record<keyof OnField, boolean>>({
    striker: false,
    nonStriker: false,
    bowler: false,
  })

  const editing = useRef<keyof OnField | null>(null)

  const striker = m?.onField.striker
  const nonStriker = m?.onField.nonStriker
  const bowler = m?.onField.bowler

  // keep the editable names in sync with the live document, without clobbering the box being typed in
  useEffect(() => {
    setField((f) => {
      const next: OnField = { striker: striker ?? '', nonStriker: nonStriker ?? '', bowler: bowler ?? '' }
      if (editing.current) next[editing.current] = f[editing.current]
      return next
    })
  }, [striker, nonStriker, bowler])

  if (authLoading || loading) return <div className="card animate-pulse text-sm text-slate-500">Loading scorer…</div>
  if (!user) return <Navigate to="/login" replace />
  if (error) return <div className="card text-sm text-red-600">{error}</div>
  if (!m || !state) return <div className="card">Match not found.</div>
  if (m.ownerId !== user.uid)
    return (
      <div className="card">
        Only the person who created this match can score it.{' '}
        <Link to={`/match/${m.id}`} className="underline">
          Watch the scoreboard
        </Link>
      </div>
    )

  const act = async (fn: Parameters<typeof updateMatch>[1]) => {
    setBusy(true)
    setMsg(null)
    try {
      await updateMatch(m.id, fn)
    } catch (e) {
      setMsg((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const record = (runs: number, d?: Delivery) => {
    const delivery: Delivery = d ?? {
      runs,
      extra,
      wicket,
      dismissal: wicket ? dismissal : null,
      fielder: wicket && fielder.trim() ? fielder.trim() : undefined,
    }
    setExtra(null)
    setWicket(false)
    setDismissal('bowled')
    setFielder('')
    return act((cur) => addBall({ ...cur, onField: field }, delivery))
  }

  const commitName = (k: keyof OnField, value: string) => {
    editing.current = null
    return act((cur) => ({ onField: { ...cur.onField, [k]: value.trim() } }))
  }

  const done = state.status === 'completed'
  const runOptions = extra === 'wd' ? [0, 1, 2, 3, 4] : [0, 1, 2, 3, 4, 5, 6]
  const currentInningsSummary = state.innings[state.currentInnings - 1]
  const battingTeamKey = currentInningsSummary.battingTeam
  const batting = teamName(m, battingTeamKey)
  const battingSquad = battingTeamKey === 'A' ? (m.teamAPlayers ?? []) : (m.teamBPlayers ?? [])
  const bowlingSquad = battingTeamKey === 'A' ? (m.teamBPlayers ?? []) : (m.teamAPlayers ?? [])

  return (
    <div className="mx-auto max-w-2xl space-y-4 pb-24">
      <div className="flex items-center gap-2">
        <h1 className="mr-auto text-lg font-bold">Scorer</h1>
        <Link to={`/match/${m.id}`} className="btn-ghost">
          Public view ↗
        </Link>
      </div>

      <LiveCard m={m} state={state} />

      {!done && (
        <>
          <div className="card space-y-3">
            <div className="text-sm font-medium text-slate-500">
              {state.status === 'innings-break' ? `Start of 2nd innings · ${batting} batting` : `${batting} batting`}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['striker', 'nonStriker', 'bowler'] as const).map((k) => {
                const squad = k === 'bowler' ? bowlingSquad : battingSquad
                const isTyping = manualTyping[k] || squad.length === 0
                const label = k === 'striker' ? 'Striker *' : k === 'nonStriker' ? 'Non-striker' : 'Bowler'
                return (
                  <div key={k}>
                    <label className="label" htmlFor={k}>
                      {label}
                    </label>
                    {!isTyping ? (
                      <select
                        id={k}
                        className="input truncate text-xs"
                        value={squad.includes(field[k]) ? field[k] : ''}
                        onChange={(e) => {
                          if (e.target.value === '__custom__') {
                            setManualTyping((prev) => ({ ...prev, [k]: true }))
                          } else {
                            setField((prev) => ({ ...prev, [k]: e.target.value }))
                            commitName(k, e.target.value)
                          }
                        }}
                      >
                        <option value="">{field[k] || `Pick ${k === 'bowler' ? 'bowler' : 'batter'}…`}</option>
                        {squad.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                        <option value="__custom__">✏️ Type name…</option>
                      </select>
                    ) : (
                      <div>
                        <input
                          id={k}
                          list={`${k}-datalist`}
                          className="input text-xs"
                          value={field[k]}
                          placeholder={k === 'bowler' ? 'Bowler' : 'Batter'}
                          onChange={(e) => setField({ ...field, [k]: e.target.value })}
                          onFocus={() => (editing.current = k)}
                          onBlur={(e) => commitName(k, e.target.value)}
                        />
                        <datalist id={`${k}-datalist`}>
                          {squad.map((p) => (
                            <option key={p} value={p} />
                          ))}
                        </datalist>
                        {squad.length > 0 && (
                          <button
                            type="button"
                            className="mt-0.5 text-[10px] text-emerald-600 underline"
                            onClick={() => setManualTyping((prev) => ({ ...prev, [k]: false }))}
                          >
                            ← Pick from list
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <button
              className="text-xs text-emerald-600 underline"
              onClick={() =>
                act(() => ({ onField: { ...field, striker: field.nonStriker, nonStriker: field.striker } }))
              }
            >
              ⇄ Swap strike
            </button>
          </div>

          <div className="card space-y-3">
            <div className="flex flex-wrap gap-2">
              {EXTRAS.map((x) => (
                <button
                  key={x.key}
                  onClick={() => setExtra(extra === x.key ? null : x.key)}
                  className={extra === x.key ? 'btn bg-amber-500 text-white' : 'btn-ghost'}
                >
                  {x.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  const next = !wicket
                  setWicket(next)
                  if (!next) {
                    setDismissal('bowled')
                    setFielder('')
                  }
                }}
                className={wicket ? 'btn-danger' : 'btn-ghost'}
              >
                Wicket
              </button>
            </div>

            {wicket && (
              <div className="rounded-xl border border-red-200 bg-red-50/60 p-3 dark:border-red-900/50 dark:bg-red-950/20 space-y-2.5">
                <div className="text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
                  Dismissal Type &amp; Fielder
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {DISMISSALS.map((d) => (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => setDismissal(d.key)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                        dismissal === d.key
                          ? 'bg-red-600 text-white shadow-sm'
                          : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
                {['caught', 'run out', 'stumped'].includes(dismissal) && (
                  <div>
                    <label className="label" htmlFor="fielder">
                      {dismissal === 'run out'
                        ? 'Fielder (run out by)'
                        : dismissal === 'stumped'
                          ? 'Wicketkeeper'
                          : 'Catcher'}
                    </label>
                    <input
                      id="fielder"
                      className="input"
                      value={fielder}
                      placeholder="Fielder name (optional)"
                      onChange={(e) => setFielder(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            <p className="text-xs text-slate-500">
              {extra || wicket
                ? `Now tap the runs ${extra === 'wd' ? 'taken on the wide (the 1-run penalty is added automatically)' : extra === 'nb' ? 'off the bat (the 1-run penalty is added automatically)' : extra ? 'taken' : 'scored on this ball'}${wicket ? ` — a wicket (${dismissal}) will be recorded` : ''}.`
                : 'Tap the runs scored. Choose an extra or wicket first if needed.'}
            </p>
            <div className="grid grid-cols-4 gap-2">
              {runOptions.map((r) => (
                <button
                  key={r}
                  disabled={busy}
                  onClick={() => record(r)}
                  className={`btn h-16 text-2xl font-black ${
                    r === 4
                      ? 'bg-blue-600 text-white hover:bg-blue-500'
                      : r === 6
                        ? 'bg-violet-600 text-white hover:bg-violet-500'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'
                  }`}
                >
                  {r}
                </button>
              ))}
              {extra === null && !wicket && (
                <button
                  disabled={busy}
                  onClick={() => {
                    setWicket(true)
                    setDismissal('bowled')
                  }}
                  className="btn-danger h-16 text-2xl font-black"
                  title="Wicket"
                >
                  W
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {msg && <p className="text-sm text-red-600">{msg}</p>}

      <div className="flex flex-wrap gap-2">
        <button
          disabled={busy || (!m.balls.length && !m.closedInnings.length)}
          onClick={() => act(undo)}
          className="btn-ghost"
        >
          ↶ Undo last
        </button>
        {!done && (
          <button
            disabled={busy}
            onClick={() => {
              if (confirm(`End the ${state.currentInnings === 1 ? '1st' : '2nd'} innings now?`)) act(closeInnings)
            }}
            className="btn-ghost"
          >
            End innings
          </button>
        )}
        <button
          disabled={busy}
          onClick={async () => {
            if (!confirm('Delete this match permanently?')) return
            await deleteMatch(m.id)
            nav('/')
          }}
          className="btn-ghost ml-auto text-red-600"
        >
          Delete match
        </button>
      </div>
    </div>
  )
}
