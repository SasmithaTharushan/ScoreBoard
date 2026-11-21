import { lazy, Suspense, useState } from 'react'
import { Link, Route, Routes } from 'react-router'
import { useAuth } from './lib/auth'
import { firebaseEnabled } from './lib/firebase'
import { signOut } from './lib/store'
import Home from './pages/Home'
import MatchView from './pages/MatchView'

const Login = lazy(() => import('./pages/Login'))
const NewMatch = lazy(() => import('./pages/NewMatch'))
const Scorer = lazy(() => import('./pages/Scorer'))
const TvScoreboard = lazy(() => import('./pages/TvScoreboard'))

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const toggle = () => {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      /* storage unavailable */
    }
    setDark(next)
  }
  return (
    <button onClick={toggle} className="btn-ghost px-3" aria-label="Toggle dark mode" title="Toggle dark mode">
      {dark ? '☀️' : '🌙'}
    </button>
  )
}

export default function App() {
  const { user } = useAuth()
  return (
    <div className="flex min-h-dvh flex-col">
      {!firebaseEnabled && (
        <div className="bg-amber-100 px-4 py-1.5 text-center text-xs text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
          Demo mode — matches are saved in this browser only. Add your Firebase keys to go live.
        </div>
      )}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <img src="/icon.svg" alt="" className="h-7 w-7" />
            ScoreBoard
          </Link>
          <div className="ml-auto flex items-center gap-2">
            {user ? (
              <>
                <Link to="/new" className="btn-primary">
                  + New match
                </Link>
                <button onClick={() => signOut()} className="btn-ghost hidden sm:inline-flex" title={user.email ?? ''}>
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary">
                Sign in
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <Suspense fallback={<div className="card animate-pulse text-sm text-slate-500">Loading page…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/new" element={<NewMatch />} />
            <Route path="/match/:id" element={<MatchView />} />
            <Route path="/match/:id/score" element={<Scorer />} />
            <Route path="/match/:id/tv" element={<TvScoreboard />} />
            <Route
              path="*"
              element={
                <div className="card text-center">
                  Page not found.{' '}
                  <Link to="/" className="text-emerald-600 underline">
                    Go home
                  </Link>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <footer className="py-6 text-center text-xs text-slate-500">
        ScoreBoard · ball-by-ball cricket scoring
        {user && (
          <button onClick={() => signOut()} className="ml-2 underline sm:hidden">
            Sign out
          </button>
        )}
      </footer>
    </div>
  )
}
