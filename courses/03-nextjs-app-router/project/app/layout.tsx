import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Next.js App Router',
  description: 'App Router challenge',
}

// Server Component
// App Directory
// File-based routing
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link>
          {' | '}
          <Link href="/about">About</Link>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  )
}