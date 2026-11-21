// Data layer with two interchangeable backends:
//  - Firebase (Firestore + Auth) when VITE_FIREBASE_* keys are set
//  - Local demo mode (localStorage, synced across tabs) when they are not
import {
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  setDoc,
} from 'firebase/firestore'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
  updateProfile,
} from 'firebase/auth'
import { auth, db, firebaseEnabled } from './firebase'
import type { Match } from './cricket'

export interface AppUser {
  uid: string
  name: string
  email: string | null
}

export interface Team {
  id: string
  ownerId: string
  name: string
  players: string[]
  createdAt: number
  updatedAt: number
}

type Unsub = () => void
export type NewMatch = Omit<Match, 'id' | 'ownerId' | 'balls' | 'closedInnings' | 'createdAt' | 'updatedAt'>

const genId = () => Math.random().toString(36).slice(2, 12)

// ---------------------------------------------------------------- local demo backend
const LS_MATCHES = 'scoreboard.matches'
const LS_TEAMS = 'scoreboard.teams'
const LS_USER = 'scoreboard.user'
const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('scoreboard') : null
const listeners = new Set<() => void>()
const notify = () => listeners.forEach((l) => l())
channel?.addEventListener('message', notify)
if (typeof window !== 'undefined') window.addEventListener('storage', notify)

function readLocal(): Record<string, Match> {
  try {
    return JSON.parse(localStorage.getItem(LS_MATCHES) || '{}')
  } catch {
    return {}
  }
}
function writeLocal(all: Record<string, Match>) {
  localStorage.setItem(LS_MATCHES, JSON.stringify(all))
  notify()
  channel?.postMessage('changed')
}
function readLocalTeams(): Record<string, Team> {
  try {
    return JSON.parse(localStorage.getItem(LS_TEAMS) || '{}')
  } catch {
    return {}
  }
}
function writeLocalTeams(all: Record<string, Team>) {
  localStorage.setItem(LS_TEAMS, JSON.stringify(all))
  notify()
  channel?.postMessage('changed')
}
function watchLocal(fn: () => void): Unsub {
  listeners.add(fn)
  fn()
  return () => listeners.delete(fn)
}
function readLocalUser(): AppUser | null {
  try {
    return JSON.parse(localStorage.getItem(LS_USER) || 'null')
  } catch {
    return null
  }
}

// ---------------------------------------------------------------- auth
export function subscribeUser(cb: (u: AppUser | null) => void): Unsub {
  if (firebaseEnabled && auth) {
    return onAuthStateChanged(auth, (u) =>
      cb(u ? { uid: u.uid, name: u.displayName || u.email?.split('@')[0] || 'Scorer', email: u.email } : null),
    )
  }
  return watchLocal(() => cb(readLocalUser()))
}

export async function signInWithGoogle() {
  if (!auth) throw new Error('Firebase is not configured')
  await signInWithPopup(auth, new GoogleAuthProvider())
}

export async function signInWithEmail(email: string, password: string) {
  if (!auth) throw new Error('Firebase is not configured')
  await signInWithEmailAndPassword(auth, email, password)
}

export async function signUpWithEmail(name: string, email: string, password: string) {
  if (!auth) throw new Error('Firebase is not configured')
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  if (name) await updateProfile(cred.user, { displayName: name })
}

export function signInDemo(name: string) {
  localStorage.setItem(LS_USER, JSON.stringify({ uid: 'demo-user', name: name || 'Demo scorer', email: null }))
  notify()
}

export async function signOut() {
  if (firebaseEnabled && auth) return fbSignOut(auth)
  localStorage.removeItem(LS_USER)
  notify()
}

// ---------------------------------------------------------------- matches
export function subscribeMatches(cb: (ms: Match[]) => void, onError?: (e: Error) => void): Unsub {
  if (firebaseEnabled && db) {
    const q = query(collection(db, 'matches'), orderBy('updatedAt', 'desc'), limit(50))
    return onSnapshot(
      q,
      (snap) => cb(snap.docs.map((d) => ({ ...(d.data() as Match), id: d.id }))),
      (e) => onError?.(e),
    )
  }
  return watchLocal(() => cb(Object.values(readLocal()).sort((a, b) => b.updatedAt - a.updatedAt)))
}

export function subscribeMatch(id: string, cb: (m: Match | null) => void, onError?: (e: Error) => void): Unsub {
  if (firebaseEnabled && db) {
    return onSnapshot(
      doc(db, 'matches', id),
      (d) => cb(d.exists() ? { ...(d.data() as Match), id: d.id } : null),
      (e) => onError?.(e),
    )
  }
  return watchLocal(() => cb(readLocal()[id] ?? null))
}

export async function createMatch(user: AppUser, data: NewMatch): Promise<string> {
  const now = Date.now()
  const id = genId()
  const match: Match = { ...data, id, ownerId: user.uid, balls: [], closedInnings: [], createdAt: now, updatedAt: now }
  if (firebaseEnabled && db) {
    const { id: _omit, ...rest } = match
    void _omit
    await setDoc(doc(db, 'matches', id), rest)
  } else {
    writeLocal({ ...readLocal(), [id]: match })
  }
  return id
}

/** Atomically read-modify-write a match (safe if two devices score at once). */
export async function updateMatch(id: string, change: (m: Match) => Partial<Match>) {
  if (firebaseEnabled && db) {
    const ref = doc(db, 'matches', id)
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(ref)
      if (!snap.exists()) throw new Error('Match not found')
      const patch = change({ ...(snap.data() as Match), id })
      tx.update(ref, { ...patch, updatedAt: Date.now() })
    })
    return
  }
  const all = readLocal()
  const m = all[id]
  if (!m) throw new Error('Match not found')
  all[id] = { ...m, ...change(m), updatedAt: Date.now() }
  writeLocal(all)
}

export async function deleteMatch(id: string) {
  if (firebaseEnabled && db) return deleteDoc(doc(db, 'matches', id))
  const all = readLocal()
  delete all[id]
  writeLocal(all)
}

// ---------------------------------------------------------------- teams
export function subscribeTeams(cb: (ts: Team[]) => void, onError?: (e: Error) => void): Unsub {
  if (firebaseEnabled && db) {
    const q = query(collection(db, 'teams'), orderBy('name', 'asc'), limit(100))
    return onSnapshot(
      q,
      (snap) => cb(snap.docs.map((d) => ({ ...(d.data() as Team), id: d.id }))),
      (e) => onError?.(e),
    )
  }
  return watchLocal(() => cb(Object.values(readLocalTeams()).sort((a, b) => a.name.localeCompare(b.name))))
}

export async function saveTeam(user: AppUser, data: { id?: string; name: string; players: string[] }): Promise<string> {
  const now = Date.now()
  const id = data.id || genId()
  const team: Team = {
    id,
    ownerId: user.uid,
    name: data.name.trim(),
    players: data.players.map((p) => p.trim()).filter(Boolean),
    createdAt: now,
    updatedAt: now,
  }
  if (firebaseEnabled && db) {
    const { id: _omit, ...rest } = team
    void _omit
    await setDoc(doc(db, 'teams', id), rest)
  } else {
    const all = readLocalTeams()
    all[id] = { ...all[id], ...team, updatedAt: now }
    writeLocalTeams(all)
  }
  return id
}

export async function deleteTeam(id: string) {
  if (firebaseEnabled && db) return deleteDoc(doc(db, 'teams', id))
  const all = readLocalTeams()
  delete all[id]
  writeLocalTeams(all)
}
