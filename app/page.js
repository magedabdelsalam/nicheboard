import JobList from '../components/JobList';

export default async function Home() {
  const data = await getData()
  console.log('Data received in Home:', data)
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to Nicheboard</h1>
      <p className="text-xl">Find your next niche job opportunity</p>
      <JobList jobs={data} />
    </div>
  )
}

async function getData() {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const apiUrl = isProduction
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/jobs`
    : 'http://localhost:3000/api/jobs'

  console.log('Fetching jobs from:', apiUrl)

  try {
    const res = await fetch(apiUrl, { cache: 'no-store' })
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

