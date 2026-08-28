import Link from 'next/link'
import Counter from './components/Counter'
import Image from 'next/image'
export default function HomePage() {
  return (
    <main>
      <h1>Welcome to Next.js App Router</h1>

      <Image
        src="https://placehold.co/600x400/png"
        alt="Placeholder image"
        width={600}
        height={400}
      />

      <nav>
        <Link href="/about">About</Link>
      </nav>
       <Counter />
    </main>
  )
}