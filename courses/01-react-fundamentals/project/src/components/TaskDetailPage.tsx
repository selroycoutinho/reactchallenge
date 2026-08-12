import { useNavigate, useParams } from 'react-router-dom'
import type { Task } from './TaskList'

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  let tasks: Task[] = []

  try {
    const savedTasks = localStorage.getItem('task-app-tasks')

    if (savedTasks) {
      tasks = JSON.parse(savedTasks) as Task[]
    }
  } catch {
    tasks = []
  }

  const task = tasks.find((item) => String(item.id) === id)

  if (!task) {
    return (
      <div id="task-detail-page">
        <h1>Task not found</h1>

        <button
          id="task-detail-back"
          type="button"
          onClick={() => navigate('/challenge/21-react-router')}
        >
          Back to list
        </button>
      </div>
    )
  }

  return (
    <div id="task-detail-page">
      <h1>{task.title}</h1>

      <p>{task.description}</p>

      <p>Priority: {task.priority}</p>

      {task.category && (
        <p>Category: {task.category}</p>
      )}

      {task.tags && task.tags.length > 0 && (
        <p>Tags: {task.tags.join(', ')}</p>
      )}

      {task.dueDate && (
        <p>
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      <button
        id="task-detail-back"
        type="button"
        onClick={() => navigate('/challenge/21-react-router')}
      >
        Back to list
      </button>
    </div>
  )
}