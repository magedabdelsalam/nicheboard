'use client'

import Link from 'next/link'
import SignOut from '../SignOut'

export default function Header({ user }) {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex container mx-auto justify-between items-center">
        <Link href="/" className="text-xl font-bold">Nicheboard</Link>
        <div className="space-x-8">
          {user ? (
            <>
              <Link href="/new" className="hover:text-gray-300">New Job</Link>
              <Link href="/account" className="hover:text-gray-300">Account</Link>
              <SignOut />
            </>
          ) : (
            <Link href="/login" className="hover:text-gray-300">Login/Signup</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
