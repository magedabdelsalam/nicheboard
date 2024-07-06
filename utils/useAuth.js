import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

const fetcher = async () => {
  const res = await fetch('/api/profile')
  if (!res.ok) throw new Error('Failed to fetch user')
  return res.json()
}

export function useAuth(redirectTo = '/login') {
  const router = useRouter()
  const { data, error } = useSWR('/api/profile', fetcher)

  useEffect(() => {
    if (error && redirectTo) {
      router.push(redirectTo)
    }
  }, [error, redirectTo, router])

  return { user: data?.user, loading: !data && !error }
}
