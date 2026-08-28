import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PostActions from './PostActions'

type Post = {
  id: number
  title: string
  body: string
}

type PostPageProps = {
  params: {
    id: string
  }
}

async function getPost(id: string): Promise<Post | null> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    return null
  }

  const post: Post = await response.json()

  if (!post || !post.id) {
    return null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPost(params.id)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    }
  }

  return {
    title: post.title,
    description: post.body,
  }
}

export default async function PostPage({
  params,
}: PostPageProps) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <PostActions />
    </main>
  )
}