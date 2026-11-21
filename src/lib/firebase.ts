import type { FirebaseApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

/** True when Firebase keys are present. Without them the app runs in local demo mode. */
export const firebaseEnabled = Boolean(config.apiKey && config.projectId)

export interface LazyFirebase {
  app: FirebaseApp
  auth: Auth
  db: Firestore
  firestore: typeof import('firebase/firestore')
  authModule: typeof import('firebase/auth')
}

let firebasePromise: Promise<LazyFirebase | null> | null = null

export function getFirebase(): Promise<LazyFirebase | null> {
  if (!firebaseEnabled) return Promise.resolve(null)
  if (!firebasePromise) {
    firebasePromise = (async () => {
      const [{ initializeApp }, { getAuth }, authModule, { getFirestore }, firestore] = await Promise.all([
        import('firebase/app'),
        import('firebase/auth'),
        import('firebase/auth'),
        import('firebase/firestore'),
        import('firebase/firestore'),
      ])
      const app = initializeApp(config)
      const auth = getAuth(app)
      const db = getFirestore(app)
      return { app, auth, db, firestore, authModule }
    })()
  }
  return firebasePromise
}
