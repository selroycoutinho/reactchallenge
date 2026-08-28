import { notFound } from 'next/navigation'

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

export default async function PostPage({
  params,
}: PostPageProps) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    {
      next: { revalidate: 60 },
    }
  )

  if (!response.ok) {
    notFound()
  }

  const post: Post = await response.json()

  if (!post || !post.id) {
    notFound()
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Post ID: {post.id}</p>
    </main>
  )
}