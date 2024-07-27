import AccountForm from './account-form'
import { createClient } from '../../utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Account() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      <AccountForm user={user} />
    </div>
  )
}