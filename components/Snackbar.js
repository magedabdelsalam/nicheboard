'use client'

import { useState, useEffect } from 'react'

export default function Snackbar({ message, isError, duration = 5000 }) {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState(Math.ceil(duration / 1000))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setIsVisible(false)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [duration])

  if (!isVisible) return null

  return (
    <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white flex justify-between items-center min-w-[300px] ${isError ? 'bg-red-500' : 'bg-green-500'}`}>
      <span>{message}</span>
      <span className="font-bold ml-2">{timeLeft}s</span>
    </div>
  )
}