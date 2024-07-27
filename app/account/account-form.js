'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '../../utils/supabase/client'
import UploadAvatar from './upload-avatar'
import Snackbar from '../../components/Snackbar'

export default function AccountForm({ user }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState(null)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [snackbar, setSnackbar] = useState({ show: false, message: '', isError: false })

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      setSnackbar({ show: true, message: 'Error loading user data!', isError: true })
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      setSnackbar({ show: true, message: 'Profile updated successfully!', isError: false })
    } catch (error) {
      setSnackbar({ show: true, message: 'Error updating the data!', isError: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <UploadAvatar
        uid={user?.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ fullname, username, website, avatar_url: url })
        }}
      />
      <div className='flex flex-col gap-2'>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          id="email"
          type="text"
          value={user?.email}
          disabled
          className="w-full p-2 border bg-gray-200 dark:bg-gray-600 dark:text-white rounded"
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Website
        </label>
        <input
          id="website"
          type="url"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="flex flex-col gap-2">
        <button
          className="w-full p-2 text-white rounded bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={() => updateProfile({ fullname, username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
        <form action="/auth/signout" method="post">
          <button className="w-full p-2 text-black dark:text-white rounded bg-gray-300 dark:bg-gray-600" type="submit">
            Sign out
          </button>
        </form>
      </div>

      {snackbar.show && (
        <Snackbar
          message={snackbar.message}
          isError={snackbar.isError}
          duration={3000}
          onClose={() => setSnackbar({ ...snackbar, show: false })}
        />
      )}
    </div>
  )
}
