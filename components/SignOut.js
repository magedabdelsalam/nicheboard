'use client'

import { useRouter } from 'next/navigation'

export default function SignOut() {
  const router = useRouter()

  const handleSignOut = async () => {
    const res = await fetch('/auth/signout', { method: 'POST' })
    if (res.ok) {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <button onClick={handleSignOut} className="hover:text-gray-300 dark:hover:text-gray-400">
      Sign out
    </button>
  )
}
