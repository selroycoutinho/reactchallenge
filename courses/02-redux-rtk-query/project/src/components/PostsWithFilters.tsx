import { useMemo } from 'react'
import {
  useGetPostsQuery,
} from '../api/apiSlice'
import {
  useAppDispatch,
  useAppSelector,
} from '../store/hooks'
import { setSortBy } from '../store/slices/filtersSlice'

export default function PostsWithFilters() {
  const { data: posts = [], isLoading, isError } =
    useGetPostsQuery()

  const sortBy = useAppSelector(
    (state) => state.filters.sortBy
  )

  const dispatch = useAppDispatch()

  const sortedPosts = useMemo(() => {
    const result = [...posts]

    if (sortBy === 'oldest') {
      return result.sort((a, b) => a.id - b.id)
    }

    return result.sort((a, b) => b.id - a.id)
  }, [posts, sortBy])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Failed to load posts.</p>
  }

  return (
    <div data-testid="posts-with-filters">
      <div data-testid="filter-controls">
        <label htmlFor="sort-posts">
          Sort:
        </label>

        <select
          id="sort-posts"
          value={sortBy}
          onChange={(event) =>
            dispatch(
              setSortBy(
                event.target.value as 'newest' | 'oldest'
              )
            )
          }
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <ul>
        {sortedPosts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}