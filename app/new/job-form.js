'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../utils/supabase/client'
import Snackbar from '../../components/Snackbar'

export default function JobForm({ user }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: ''
  })
  const [snackbar, setShowSnackbar] = useState({ show: false, message: '', isError: false })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setShowSnackbar({ show: true, message: 'You must be logged in to add a new job.', isError: true })
      return
    }
    setIsSubmitting(true)
    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert([{ ...formData, user_id: user.id }])
        .select()

      if (error) throw error

      setShowSnackbar({ show: true, message: 'Job added successfully. Redirecting to home...', isError: false })
      
      router.push('/')
      router.refresh()

    } catch (error) {
      console.error('Error adding job:', error)
      setShowSnackbar({ show: true, message: `Error adding job: ${error.message}`, isError: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          required
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Description"
          required
          className="w-full p-2 border rounded h-32 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          required
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
          min="0"
          step="1000"
          required
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-2 text-white rounded ${isSubmitting ? 'bg-gray-400 dark:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'}`}
        >
          {isSubmitting ? 'Adding...' : 'Add Job'}
        </button>
        {snackbar.show && (
        <Snackbar
          message={snackbar.message}
          isError={snackbar.isError}
          duration={3000}
          onClose={() => setShowSnackbar({ ...snackbar, show: false })}
        />
      )}
      </form>
  )
}