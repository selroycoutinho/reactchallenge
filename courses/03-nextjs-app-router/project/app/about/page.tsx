import Link from 'next/link'

// Server Component
// App Directory
// File-based routing
export default function AboutPage() {
  return (
    <main>
      <h1>About</h1>
      <p>This is the About page.</p>

      <Link href="/">Home</Link>
    </main>
  )
}