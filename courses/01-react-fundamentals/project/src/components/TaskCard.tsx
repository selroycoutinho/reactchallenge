import { useState } from 'react'

interface TaskCardProps {
  title: string
  description: string
  priority: string
  category?: string
  tags?: string[]
  dueDate?: string | number
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
      dueDate?: string
    }
  ) => void
}

export default function TaskCard({
  title,
  description,
  priority,
  category = 'General',
  tags = [],
  dueDate,
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
  const [editDueDate, setEditDueDate] = useState(
    dueDate ? String(dueDate) : ''
  )

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
    setEditDueDate(dueDate ? String(dueDate) : '')
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
      dueDate: editDueDate || undefined,
    })
  }

  const getDueDateStatus = () => {
    if (!dueDate || completed) {
      return ''
    }

    const due = new Date(dueDate)

    if (Number.isNaN(due.getTime())) {
      return ''
    }

    const today = new Date()

    due.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)

    const differenceInDays = Math.ceil(
      (due.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
    )

    if (differenceInDays < 0) {
      return 'Overdue'
    }

    if (differenceInDays === 0) {
      return 'Due Today'
    }

    if (differenceInDays <= 3) {
      return 'Due Soon'
    }

    return ''
  }

  const dueDateStatus = getDueDateStatus()
  const isOverdue = dueDateStatus === 'Overdue'

  if (isEditing) {
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

        <input
          type="date"
          value={editDueDate}
          onChange={(event) => setEditDueDate(event.target.value)}
          aria-label="Task due date"
        />

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
      data-overdue={isOverdue ? 'true' : 'false'}
      style={{
        backgroundColor: completed ? '#e8f5e9' : '#fff',
        padding: '10px',
        marginBottom: '10px',
        border: isOverdue ? '2px solid red' : '1px solid #ccc',
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

      <p id="task-category">{category || 'General'}</p>

      <div id="task-tags">
        {tags.map((tag) => (
          <span
            key={tag}
            data-tag={tag}
            style={{
              display: 'inline-block',
              padding: '3px 8px',
              marginRight: '5px',
              borderRadius: '10px',
              backgroundColor: '#eee',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {dueDate && (
        <p
          id="task-due-date"
          data-overdue={isOverdue ? 'true' : 'false'}
          style={{
            color: isOverdue ? 'red' : 'inherit',
            fontWeight: isOverdue ? 'bold' : 'normal',
          }}
        >
          Due: {new Date(dueDate).toLocaleDateString()}
          {dueDateStatus && ` — ${dueDateStatus}`}
        </p>
      )}

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