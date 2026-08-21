import { useGetUsersQuery } from '../api/apiSlice'
import ErrorDisplay from './ErrorDisplay'

export default function UsersList() {
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUsersQuery()

  if (isLoading) {
    return (
      <p data-testid="users-loading">
        Loading users...
      </p>
    )
  }

  if (isError) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={refetch}
      />
    )
  }

  return (
    <ul data-testid="users-list">
      {users.map((user) => (
        <li key={user.id}>
          <strong>{user.name}</strong>
          <span> — {user.email}</span>
          <span> — {user.username}</span>
        </li>
      ))}
    </ul>
  )
}