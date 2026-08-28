import type { Metadata } from 'next'
import Link from 'next/link'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Next.js App Router Challenges',
  description:
    'A Next.js App Router project demonstrating modern Next.js features.',
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
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