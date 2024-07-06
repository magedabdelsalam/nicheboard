import JobList from '../components/JobList';

export default async function Home() {
  const data = await getData()
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to Nicheboard</h1>
      <p className="text-xl">Find your next niche job opportunity</p>
      <JobList jobs={data} />
    </div>
  )
}

async function getData() {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const host = process.env.VERCEL_URL || 'localhost:3000'
  const res = await fetch(`${protocol}://${host}/api/jobs`, { cache: 'no-store' })
  if (!res.ok) {
    console.error('Failed to fetch data:', res.statusText)
    return []  // Return an empty array if there's an error
  }
  return res.json()
}