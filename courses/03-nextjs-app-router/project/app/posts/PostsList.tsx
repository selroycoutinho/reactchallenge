'use client'

import { useGetPostsQuery } from '../store/apiSlice'

export default function PostsList() {
  const {
    data: posts,
    isLoading,
    isError,
  } = useGetPostsQuery()

  if (isLoading) {
    return <p>Loading posts...</p>
  }

  if (isError) {
    return <p>Failed to load posts.</p>
  }

  if (!posts || posts.length === 0) {
    return <p>No posts found.</p>
  }

  return (
    <section>
      <h2>Posts from RTK Query</h2>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}