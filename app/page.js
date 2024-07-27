import JobList from '../components/JobList';

export default async function Home() {
  const data = await getData()
  console.log('Data received in Home:', data)
  return (
    <div className="flex flex-col gap-8 mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Nicheboard</h1>
        <p className="text-xl text-gray-500 dark:text-gray-300">Find your people</p>
      </div>
      <JobList jobs={data} />
    </div>
  )
}

async function getData() {
  const apiUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/jobs`
    : 'http://localhost:3000/api/jobs'

  console.log('Fetching jobs from:', apiUrl)

  try {
    const res = await fetch(apiUrl, { next: { revalidate: 60 } })
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
    }
    const data = await res.json()
    console.log('Fetched jobs:', data)
    return data
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return []
  }
}
