import { notFound } from 'next/navigation'
import Avatar from '../../../components/Avatar'

export default async function JobPage({ params }) {
  const job = await getJob(params.id)

  if (!job) {
    notFound()
  }

  // Assuming job.posted_at is a timestamp or date string
  const postedDate = new Date(job.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{job.title}</h1>
          <div className="flex items-center gap-3 mb-6">
            {job.user_avatar && (
              <Avatar
                url={job.user_avatar}
                size={48}
                className="mr-4"
              />
            )}
            <div>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{job.user_full_name || 'Unknown'}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Posted on {postedDate}</p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">{job.description}</p>
          <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-4 space-y-3">
            <JobDetail label="Company" value={job.company} />
            <JobDetail label="Location" value={job.location} />
            <JobDetail label="Salary" value={`$${job.salary}`} />
          </div>
        </div>
      </div>
    </div>
  )
}

function JobDetail({ label, value }) {
  return (
    <p className="flex justify-between items-center text-gray-700 dark:text-gray-200">
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
    </p>
  )
}

async function getJob(id) {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const apiUrl = isProduction
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/jobs/${id}`
    : `http://localhost:3000/api/jobs/${id}`

  console.log('Fetching jobs from:', apiUrl)

  const res = await fetch(apiUrl, { cache: 'no-store' })
  if (!res.ok) {
    if (res.status === 404) return null
    throw new Error('Failed to fetch job')
  }
  return res.json()
}
