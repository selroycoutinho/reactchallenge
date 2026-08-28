import Link from 'next/link'

type Post = {
  id: number
  title: string
  body: string
}

type PostsPageProps = {
  searchParams: {
    q?: string
    page?: string
  }
}

export default async function PostsPage({
  searchParams,
}: PostsPageProps) {
  const query = searchParams.q?.toLowerCase().trim() || ''
  const currentPage = Math.max(
    1,
    Number(searchParams.page) || 1
  )

  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts',
      {
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }

    const posts: Post[] = await response.json()

    const filteredPosts = query
      ? posts.filter((post) =>
          post.title.toLowerCase().includes(query)
        )
      : posts

    const postsPerPage = 10
    const totalPages = Math.ceil(
      filteredPosts.length / postsPerPage
    )

    const safePage = Math.min(
      currentPage,
      Math.max(totalPages, 1)
    )

    const startIndex = (safePage - 1) * postsPerPage
    const paginatedPosts = filteredPosts.slice(
      startIndex,
      startIndex + postsPerPage
    )

    return (
      <main>
        <h1>Posts</h1>

        <form method="GET" action="/posts">
          <input
            type="text"
            name="q"
            placeholder="Search posts..."
            defaultValue={searchParams.q || ''}
          />
          <button type="submit">Search</button>
        </form>

        {query && (
          <p>
            Search results for: <strong>{query}</strong>
          </p>
        )}

        {paginatedPosts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <ul>
            {paginatedPosts.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )}

        {totalPages > 1 && (
          <nav>
            {safePage > 1 && (
              <Link
                href={`/posts?page=${safePage - 1}${
                  query ? `&q=${encodeURIComponent(query)}` : ''
                }`}
              >
                Previous
              </Link>
            )}

            <span>
              {' '}
              Page {safePage} of {totalPages}{' '}
            </span>

            {safePage < totalPages && (
              <Link
                href={`/posts?page=${safePage + 1}${
                  query ? `&q=${encodeURIComponent(query)}` : ''
                }`}
              >
                Next
              </Link>
            )}
          </nav>
        )}
      </main>
    )
  } catch {
    return (
      <main>
        <h1>Posts</h1>
        <p>Unable to load posts.</p>
      </main>
    )
  }
}