import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../lib/auth'
import { computeState, teamName, type Match } from '../lib/cricket'
import { subscribeMatches } from '../lib/store'
import { StatusBadge } from '../components/ScoreParts'

export default function Home() {
  const { user } = useAuth()
  const [matches, setMatches] = useState<Match[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [mine, setMine] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'completed'>('all')

  useEffect(() => subscribeMatches(setMatches, (e) => setError(e.message)), [])

  const list = useMemo(() => {
    return (matches ?? [])
      .map((m) => ({ m, s: computeState(m) }))
      .filter(({ m, s }) => {
        if (mine && m.ownerId !== user?.uid) return false
        if (search.trim()) {
          const q = search.trim().toLowerCase()
          const matchA = m.teamA.toLowerCase().includes(q)
          const matchB = m.teamB.toLowerCase().includes(q)
          const matchTitle = m.title.toLowerCase().includes(q)
          if (!matchA && !matchB && !matchTitle) return false
        }
        if (statusFilter === 'live') {
          const isLive = s.status === 'innings-1' || s.status === 'innings-2' || s.status === 'innings-break'
          if (!isLive) return false
        } else if (statusFilter === 'completed') {
          if (s.status !== 'completed') return false
        }
        return true
      })
  }, [matches, mine, user, search, statusFilter])

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-br from-emerald-600 to-slate-900 p-6 text-white sm:p-10">
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Live cricket scoring, ball by ball.</h1>
        <p className="mt-3 max-w-xl text-emerald-50/90">
          Score from your phone and share a link — everyone watching sees every run, wicket and over the moment it
          happens.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to={user ? '/new' : '/login'} className="btn bg-white text-slate-900 hover:bg-emerald-50">
            Start scoring a match
          </Link>
          <a href="#matches" className="btn border border-white/40 text-white hover:bg-white/10">
            Watch live matches
          </a>
        </div>
      </section>

      <section id="matches" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Matches</h2>
          <div className="flex flex-wrap items-center gap-2">
            {/* Live / Completed filter */}
            <div className="flex rounded-xl border border-slate-300 p-0.5 text-xs font-semibold dark:border-slate-700">
              {(['all', 'live', 'completed'] as const).map((sf) => (
                <button
                  key={sf}
                  onClick={() => setStatusFilter(sf)}
                  className={`rounded-lg px-2.5 py-1 uppercase tracking-wider ${
                    statusFilter === sf
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {sf === 'live' ? '● Live' : sf}
                </button>
              ))}
            </div>

            {/* All / Mine filter */}
            {user && (
              <div className="flex rounded-xl border border-slate-300 p-0.5 text-xs font-semibold dark:border-slate-700">
                {(['All', 'Mine'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setMine(t === 'Mine')}
                    className={`rounded-lg px-2.5 py-1 ${
                      mine === (t === 'Mine')
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Team Search Input */}
        <div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search matches by team or title…"
            className="input text-sm"
          />
        </div>
        {error && <div className="card text-sm text-red-600">Couldn't load matches: {error}</div>}
        {!matches && !error && <div className="card animate-pulse text-sm text-slate-500">Loading matches…</div>}
        {matches && list.length === 0 && (
          <div className="card text-center text-sm text-slate-500">
            No matches yet.{' '}
            {user ? (
              <Link to="/new" className="text-emerald-600 underline">
                Create the first one
              </Link>
            ) : (
              'Sign in to create one.'
            )}
          </div>
        )}
        <ul className="grid gap-3 sm:grid-cols-2">
          {list.map(({ m, s }) => (
            <li key={m.id}>
              <Link to={`/match/${m.id}`} className="card block transition hover:border-emerald-500">
                <div className="mb-2 flex items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="truncate">
                    {m.title} · {new Date(m.createdAt).toLocaleDateString()}
                  </span>
                  <StatusBadge state={s} />
                </div>
                {s.innings.map((inn) => (
                  <div key={inn.no} className="flex justify-between gap-3">
                    <span className="truncate font-semibold">{teamName(m, inn.battingTeam)}</span>
                    <span className="tabular">
                      {inn.legalBalls || m.balls.some((b) => b.innings === inn.no) ? (
                        <>
                          <b>
                            {inn.runs}/{inn.wickets}
                          </b>{' '}
                          <span className="text-xs text-slate-500">({inn.overs})</span>
                        </>
                      ) : (
                        <span className="text-xs text-slate-500">—</span>
                      )}
                    </span>
                  </div>
                ))}
                {s.result && (
                  <div className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">{s.result}</div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
