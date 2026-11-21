import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { subscribeUser, type AppUser } from './store'

interface AuthState {
  user: AppUser | null
  loading: boolean
}

const AuthContext = createContext<AuthState>({ user: null, loading: true })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, loading: true })
  useEffect(() => subscribeUser((user) => setState({ user, loading: false })), [])
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
