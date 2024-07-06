import HeaderWrapper from '/components/Header/header-wrapper'
import Footer from '/components/Footer'
import '/app/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <HeaderWrapper />
        <main className="container mx-auto px-4 py-8">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}