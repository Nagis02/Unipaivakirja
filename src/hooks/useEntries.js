import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { subscribeToEntries } from '../services/entries'

export const useEntries = () => {
  const { user } = useAuth()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setEntries([])
      setLoading(false)
      return
    }

    setLoading(true)
    const unsubscribe = subscribeToEntries(user.uid, (data) => {
      setEntries(data)
      setLoading(false)
    })

    return unsubscribe
  }, [user])

  return { entries, loading }
}