'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '../../utils/supabase/client'
import Image from 'next/image'
import Snackbar from '../../components/Snackbar'

export default function Avatar({ uid, url, size, onUpload }) {
  const supabase = createClient()
  const [avatarUrl, setAvatarUrl] = useState(url)
  const [uploading, setUploading] = useState(false)
  const [snackbar, setSnackbar] = useState({ show: false, message: '', isError: false })

  useEffect(() => {
    async function downloadImage(path) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase])

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
      setSnackbar({ show: true, message: 'Avatar uploaded successfully', isError: false })
    } catch (error) {
      setSnackbar({ show: true, message: 'Error uploading avatar', isError: true })
    } finally {
      setUploading(false)
    }
  }

  const deleteAvatar = async () => {
    try {
      setUploading(true)

      // Delete the file from storage
      const { error: deleteError } = await supabase.storage
        .from('avatars')
        .remove([avatarUrl])

      if (deleteError) {
        throw deleteError
      }

      // Update the user's avatar_url to null
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('id', uid)

      if (updateError) {
        throw updateError
      }

      setAvatarUrl(null)
      onUpload(null)
      setSnackbar({ show: true, message: 'Avatar deleted successfully', isError: false })
    } catch (error) {
      console.error('Error deleting avatar:', error)
      setSnackbar({ show: true, message: 'Error deleting avatar', isError: true })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {avatarUrl ? (
        <div className="flex gap-2 w-full">
          <Image
            width={size}
            height={size}
            src={avatarUrl}
            alt="Avatar"
            className="avatar image rounded-full"
          />
          <button
            onClick={deleteAvatar}
            className="bg-red-500 text-white rounded-full p-1 h-6"
            disabled={uploading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 grow-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="avatar no-image bg-gray-200 dark:bg-gray-600" style={{ height: size, width: size }} />
      )}
      <div>
        <button
          onClick={() => document.getElementById('avatar-upload').click()}
          className="p-2 px-4 text-black dark:text-white rounded bg-gray-300 dark:bg-gray-600"
          disabled={uploading}
        >
          {uploading ? 'Processing ...' : 'Upload Avatar'}
        </button>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
          className="hidden"
        />
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
