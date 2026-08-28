import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Next.js App Router Challenges',
  description:
    'A Next.js App Router project demonstrating routing, server components, data fetching, caching, and more.',
  openGraph: {
    title: 'Next.js App Router Challenges',
    description:
      'A Next.js App Router project demonstrating modern Next.js features.',
  },
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link>
          {' | '}
          <Link href="/about">About</Link>
        </nav>

        {children}
      </body>
    </html>
  )
}