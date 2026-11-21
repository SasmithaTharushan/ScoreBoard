import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../lib/auth'
import { firebaseEnabled } from '../lib/firebase'
import { signInDemo, signInWithEmail, signInWithGoogle, signUpWithEmail } from '../lib/store'

export default function Login() {
  const { user } = useAuth()
  const nav = useNavigate()
  const [mode, setMode] = useState<'in' | 'up'>('in')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (user) nav('/new', { replace: true })
  }, [user, nav])

  const run = async (fn: () => Promise<void> | void) => {
    setError(null)
    setBusy(true)
    try {
      await fn()
    } catch (e) {
      setError((e as Error).message.replace('Firebase: ', ''))
    } finally {
      setBusy(false)
    }
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!firebaseEnabled) return run(() => signInDemo(name))
    return run(() => (mode === 'in' ? signInWithEmail(email, password) : signUpWithEmail(name, email, password)))
  }

  return (
    <div className="mx-auto max-w-sm">
      <div className="card space-y-4 p-6">
        <div>
          <h1 className="text-2xl font-bold">{mode === 'in' ? 'Sign in to score' : 'Create a scorer account'}</h1>
          <p className="text-sm text-slate-500">Anyone can watch a match. You only need an account to score.</p>
        </div>

        {firebaseEnabled && (
          <>
            <button disabled={busy} onClick={() => run(signInWithGoogle)} className="btn-ghost w-full">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.9-5.5 3.9-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.3 14.6 2.3 12 2.3 6.6 2.3 2.3 6.6 2.3 12S6.6 21.7 12 21.7c5.6 0 9.3-3.9 9.3-9.5 0-.6-.1-1.1-.2-1.6H12z" />
              </svg>
              Continue with Google
            </button>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              or
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>
          </>
        )}

        <form onSubmit={submit} className="space-y-3">
          {(mode === 'up' || !firebaseEnabled) && (
            <div>
              <label className="label" htmlFor="name">Your name</label>
              <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Sasa" />
            </div>
          )}
          {firebaseEnabled && (
            <>
              <div>
                <label className="label" htmlFor="email">Email</label>
                <input id="email" type="email" required className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="label" htmlFor="pw">Password</label>
                <input id="pw" type="password" required minLength={6} className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={busy} className="btn-primary w-full">
            {!firebaseEnabled ? 'Continue in demo mode' : mode === 'in' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        {firebaseEnabled && (
          <p className="text-center text-sm text-slate-500">
            {mode === 'in' ? 'New here?' : 'Already have an account?'}{' '}
            <button className="text-emerald-600 underline" onClick={() => setMode(mode === 'in' ? 'up' : 'in')}>
              {mode === 'in' ? 'Create an account' : 'Sign in'}
            </button>
          </p>
        )}
      </div>
    </div>
  )
}
