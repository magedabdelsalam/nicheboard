import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Nicheboard</h3>
            <p className="text-sm">Find your next niche job opportunity</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm">
              <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link href="/new" className="hover:text-gray-300">Post a Job</Link></li>
              <li><Link href="/account" className="hover:text-gray-300">Account</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="text-sm">Email: support@nicheboard.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 dark:border-gray-300 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Nicheboard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
