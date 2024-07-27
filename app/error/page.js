export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-600 dark:text-red-400">Error</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300">Sorry, something went wrong.</p>
      </div>
    </div>
  )
}