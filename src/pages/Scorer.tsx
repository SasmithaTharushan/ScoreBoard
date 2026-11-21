import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router'
import LiveCard from '../components/LiveCard'
import { useAuth } from '../lib/auth'
import { teamName, type Extra, type OnField } from '../lib/cricket'
import { addBall, closeInnings, undo, type Delivery } from '../lib/scoring'
import { deleteMatch, updateMatch } from '../lib/store'
import { useMatch } from '../lib/useMatch'

const EXTRAS: { key: Exclude<Extra, null>; label: string }[] = [
  { key: 'wd', label: 'Wide' },
  { key: 'nb', label: 'No ball' },
  { key: 'b', label: 'Bye' },
  { key: 'lb', label: 'Leg bye' },
]

export default function Scorer() {
  const { id } = useParams()
  const nav = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const { match: m, state, error, loading } = useMatch(id)
  const [extra, setExtra] = useState<Extra>(null)
  const [wicket, setWicket] = useState(false)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const [field, setField] = useState<OnField>({ striker: '', nonStriker: '', bowler: '' })

  const editing = useRef<keyof OnField | null>(null)

  // keep the editable names in sync with the live document, without clobbering the box being typed in
  useEffect(() => {
    if (!m) return
    setField((f) => {
      const next = { ...m.onField }
      if (editing.current) next[editing.current] = f[editing.current]
      return next
    })
  }, [m?.onField.striker, m?.onField.nonStriker, m?.onField.bowler])

  if (authLoading || loading) return <div className="card animate-pulse text-sm text-slate-500">Loading scorer…</div>
  if (!user) return <Navigate to="/login" replace />
  if (error) return <div className="card text-sm text-red-600">{error}</div>
  if (!m || !state) return <div className="card">Match not found.</div>
  if (m.ownerId !== user.uid)
    return (
      <div className="card">
        Only the person who created this match can score it. <Link to={`/match/${m.id}`} className="underline">Watch the scoreboard</Link>
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

  const record = (runs: number, d: Delivery = { runs, extra, wicket }) => {
    setExtra(null)
    setWicket(false)
    return act((cur) => addBall({ ...cur, onField: field }, d))
  }

  const commitName = (k: keyof OnField, value: string) => {
    editing.current = null
    return act((cur) => ({ onField: { ...cur.onField, [k]: value.trim() } }))
  }

  const done = state.status === 'completed'
  const runOptions = extra === 'wd' ? [0, 1, 2, 3, 4] : [0, 1, 2, 3, 4, 5, 6]
  const batting = teamName(m, state.innings[state.currentInnings - 1].battingTeam)

  return (
    <div className="mx-auto max-w-2xl space-y-4 pb-24">
      <div className="flex items-center gap-2">
        <h1 className="mr-auto text-lg font-bold">Scorer</h1>
        <Link to={`/match/${m.id}`} className="btn-ghost">Public view ↗</Link>
      </div>

      <LiveCard m={m} state={state} />

      {!done && (
        <>
          <div className="card space-y-3">
            <div className="text-sm font-medium text-slate-500">
              {state.status === 'innings-break' ? `Start of 2nd innings · ${batting} batting` : `${batting} batting`}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['striker', 'nonStriker', 'bowler'] as const).map((k) => (
                <div key={k}>
                  <label className="label" htmlFor={k}>{k === 'striker' ? 'Striker *' : k === 'nonStriker' ? 'Non-striker' : 'Bowler'}</label>
                  <input
                    id={k}
                    className="input"
                    value={field[k]}
                    placeholder={k === 'bowler' ? 'Bowler' : 'Batter'}
                    onChange={(e) => setField({ ...field, [k]: e.target.value })}
                    onFocus={() => (editing.current = k)}
                    onBlur={(e) => commitName(k, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <button
              className="text-xs text-emerald-600 underline"
              onClick={() => act(() => ({ onField: { ...field, striker: field.nonStriker, nonStriker: field.striker } }))}
            >
              ⇄ Swap strike
            </button>
          </div>

          <div className="card space-y-3">
            <div className="flex flex-wrap gap-2">
              {EXTRAS.map((x) => (
                <button key={x.key} onClick={() => setExtra(extra === x.key ? null : x.key)} className={extra === x.key ? 'btn bg-amber-500 text-white' : 'btn-ghost'}>
                  {x.label}
                </button>
              ))}
              <button onClick={() => setWicket(!wicket)} className={wicket ? 'btn-danger' : 'btn-ghost'}>
                Wicket
              </button>
            </div>
            <p className="text-xs text-slate-500">
              {extra || wicket
                ? `Now tap the runs ${extra === 'wd' ? 'taken on the wide (the 1-run penalty is added automatically)' : extra === 'nb' ? 'off the bat (the 1-run penalty is added automatically)' : extra ? 'taken' : 'scored on this ball'}${wicket ? ' — a wicket will be recorded' : ''}.`
                : 'Tap the runs scored. Choose an extra or wicket first if needed.'}
            </p>
            <div className="grid grid-cols-4 gap-2">
              {runOptions.map((r) => (
                <button
                  key={r}
                  disabled={busy}
                  onClick={() => record(r)}
                  className={`btn h-16 text-2xl font-black ${
                    r === 4 ? 'bg-blue-600 text-white hover:bg-blue-500' : r === 6 ? 'bg-violet-600 text-white hover:bg-violet-500' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'
                  }`}
                >
                  {r}
                </button>
              ))}
              {extra === null && !wicket && (
                <button disabled={busy} onClick={() => record(0, { runs: 0, extra: null, wicket: true })} className="btn-danger h-16 text-2xl font-black" title="Wicket">
                  W
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {msg && <p className="text-sm text-red-600">{msg}</p>}

      <div className="flex flex-wrap gap-2">
        <button disabled={busy || (!m.balls.length && !m.closedInnings.length)} onClick={() => act(undo)} className="btn-ghost">
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
