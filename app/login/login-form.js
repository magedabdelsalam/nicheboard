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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className='flex flex-col gap-2'>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-2 text-white rounded ${
            isLoading ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
        </button>
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {isSignUp ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
        </button>
      </div>
    </form>
  )
}