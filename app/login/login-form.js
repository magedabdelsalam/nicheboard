'use client'

import { useState } from 'react'
import { login, signup } from './actions'

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData(event.target)
    try {
      if (isSignUp) {
        await signup(formData)
      } else {
        await login(formData)
      }
    } catch (error) {
      console.error('Authentication error:', error)
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 text-white rounded ${
            isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
        </button>
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-500 hover:text-blue-600"
        >
          {isSignUp ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
        </button>
      </div>
    </form>
  )
}