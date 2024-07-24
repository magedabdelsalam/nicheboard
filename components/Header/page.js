'use client'

import Link from 'next/link'
import SignOut from '../SignOut'
import { useState, useEffect } from 'react'

export default function Header({ user }) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDarkMode = localStorage.getItem('darkMode') === 'true'
      setDarkMode(isDarkMode)
      if (isDarkMode) {
        document.documentElement.classList.add('dark')
      }
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    document.documentElement.classList.toggle('dark')
  }

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 text-white p-4">
      <div className="flex container mx-auto justify-between items-center">
        <Link href="/" className="text-xl font-bold">Nicheboard</Link>
        <div className="space-x-8 flex items-center">
          {user ? (
            <>
              <Link href="/new" className="hover:text-gray-300">New Job</Link>
              <Link href="/account" className="hover:text-gray-300">Account</Link>
              <SignOut />
            </>
          ) : (
            <Link href="/login" className="hover:text-gray-300">Login/Signup</Link>
          )}
          <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-700 dark:bg-gray-600">
            {darkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  )
}
