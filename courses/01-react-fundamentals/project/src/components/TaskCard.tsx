import { useState } from 'react'

interface TaskCardProps {
  title: string
  description: string
  priority: string
  completed?: boolean
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void
  taskId?: string | number
  editingId?: string | number | null
  onStartEdit?: (id: string | number) => void
  onCancelEdit?: () => void
  onUpdateTask?: (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: string
    }
  ) => void
}

export default function TaskCard({
  title,
  description,
  priority,
  completed = false,
  onToggle,
  onDelete,
  taskId,
  editingId,
  onStartEdit,
  onCancelEdit,
  onUpdateTask,
}: TaskCardProps) {
  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] = useState(description)
  const [editPriority, setEditPriority] = useState(priority)

  const isEditing = editingId === taskId

  const handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      onDelete?.(taskId!)
    }
  }

  const handleEdit = () => {
    setEditTitle(title)
    setEditDescription(description)
    setEditPriority(priority)
    onStartEdit?.(taskId!)
  }

  const handleSave = () => {
    if (!editTitle.trim()) {
      return
    }

    onUpdateTask?.(taskId!, {
      title: editTitle.trim(),
      description: editDescription,
      priority: editPriority,
    })
  }

  if (isEditing) {
    return (
      <article id="task-card">
        <input
          type="text"
          value={editTitle}
          onChange={(event) => setEditTitle(event.target.value)}
          aria-label="Task title"
        />

        <textarea
          value={editDescription}
          onChange={(event) => setEditDescription(event.target.value)}
          aria-label="Task description"
        />

        <select
          value={editPriority}
          onChange={(event) => setEditPriority(event.target.value)}
          aria-label="Task priority"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button type="button" onClick={handleSave}>
          Save
        </button>

        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      </article>
    )
  }

  return (
    <article
      id="task-card"
      data-completed={completed}
      style={{
        backgroundColor: completed ? '#e8f5e9' : '#fff',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
      }}
    >
      {onToggle && (
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(taskId!)}
        />
      )}

      <h2
        style={{
          textDecoration: completed ? 'line-through' : 'none',
        }}
      >
        {title}
      </h2>

      <p
        style={{
          textDecoration: completed ? 'line-through' : 'none',
        }}
      >
        {description}
      </p>

      <p>{priority}</p>

      {onStartEdit && (
        <button type="button" onClick={handleEdit}>
          Edit
        </button>
      )}

      {onDelete && (
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </article>
  )
}