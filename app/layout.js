import HeaderWrapper from '/components/Header/header-wrapper'
import Footer from '/components/Footer'
import './globals.css'
import { CSPostHogProvider } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CSPostHogProvider>
      <body className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-white">
        <HeaderWrapper />
        <main className="flex-grow container mx-auto px-4 py-8">
        {children}
        </main>
        <Footer />
      </body>
      </CSPostHogProvider>
    </html>
  )
}