import Link from 'next/link'
import Avatar from './Avatar'

export default function JobList({ jobs }) {
  console.log('Jobs received in JobList:', jobs)

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="bg-white dark:bg-gray-700 p-4 rounded shadow">
          <div className="flex items-center space-x-4">
            <Avatar
              url={job.user_avatar}
              size={40}
            />
            <div>
              <Link href={`/jobs/${job.id}`} className="text-lg font-semibold hover:underline dark:text-white">
                {job.title}
              </Link>
              <p className="text-gray-600 dark:text-gray-300">{job.company} {job.user_full_name ? "by " + job.user_full_name : null}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400"></p>
            </div>
          </div>
          <p className="mt-2 dark:text-gray-200">{job.description.substring(0, 100)}...</p>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{job.location}</span> • <span>${job.salary}</span>
          </div>
        </div>
      ))}
    </div>
  )
}