import { useGetUsersQuery } from '../api/apiSlice'

export default function UsersList() {
  const useQueryHook = useGetUsersQuery

  const { data, isLoading, error } = useQueryHook()

  if (isLoading) {
    return <p data-testid="users-loading">Loading...</p>
  }

  if (error) {
    return (
      <p data-testid="users-error">
        Failed to load users
      </p>
    )
  }

  return (
    <ul data-testid="users-list">
      {data?.map((user) => (
        <li key={user.id}>
          <strong>{user.name}</strong>
          <span> — {user.email}</span>
          <span> — @{user.username}</span>
        </li>
      ))}
    </ul>
  )
}