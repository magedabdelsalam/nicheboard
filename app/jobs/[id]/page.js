import { createClient } from '../../../utils/supabase/server'
import { cookies } from 'next/headers'

export default async function JobPage({ params }) {
  const job = await getJob(params.id)

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-600 mb-4">{job.description}</p>
      <div className="space-y-2">
        <p><span className="font-semibold">Company:</span> {job.company}</p>
        <p><span className="font-semibold">Location:</span> {job.location}</p>
        <p><span className="font-semibold">Salary:</span> ${job.salary}</p>
      </div>
    </div>
  )
}

async function getJob(id) {
  const cookieStore = cookies()
  const supabase = createClient()
  const { data, error } = await supabase
    .from('jobs')
    .select()
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching job:', error)
    return null
  }

  return data
}
