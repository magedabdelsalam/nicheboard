import JobForm from './job-form'
import { createClient } from '../../utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function NewJob() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Post a New Job</h1>
      <JobForm user={user} />
    </div>
  )
}
