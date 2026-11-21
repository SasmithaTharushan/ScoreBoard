import { useEffect, useMemo, useState } from 'react'
import { computeState, type Match } from './cricket'
import { subscribeMatch } from './store'

export function useMatch(id: string | undefined) {
  const [match, setMatch] = useState<Match | null | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (!id) return
    return subscribeMatch(id, setMatch, (e) => setError(e.message))
  }, [id])
  const state = useMemo(() => (match ? computeState(match) : null), [match])
  return { match, state, error, loading: match === undefined && !error }
}
