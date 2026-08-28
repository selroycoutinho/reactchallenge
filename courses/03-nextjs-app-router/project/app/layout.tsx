import type { Metadata } from 'next'
import StoreProvider from './providers/StoreProvider'

export const metadata: Metadata = {
  title: 'Next.js App Router',
  description: 'Next.js App Router challenge project',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}