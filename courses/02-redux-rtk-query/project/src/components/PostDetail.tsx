import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../api/apiSlice'

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>()

  const id = postId ? Number(postId) : 1

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useGetPostByIdQuery(id, {
    skip: !id,
  })

  if (isLoading) {
    return (
      <p data-testid="post-detail-loading">
        Loading post...
      </p>
    )
  }

  if (isError) {
    return (
      <p data-testid="post-detail-error">
        {error instanceof Error
          ? error.message
          : 'Failed to load post.'}
      </p>
    )
  }

  if (!post) {
    return <p>No post found.</p>
  }

  return (
    <div data-testid="post-detail">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p>User ID: {post.userId}</p>
    </div>
  )
}