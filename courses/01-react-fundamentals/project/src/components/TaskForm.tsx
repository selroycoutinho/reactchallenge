import { useState } from 'react'

interface TaskFormProps {
  onAddTask?: (task: Record<string, unknown>) => void
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Low')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (title.trim() === '') {
      setError('Title is required')
      return
    }

    setError('')

    onAddTask?.({
      id: Date.now(),
      title,
      description,
      priority,
      completed: false,
    })

    setTitle('')
    setDescription('')
    setPriority('Low')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="task-title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button type="submit">Add Task</button>

      {error && (
        <p id="task-form-error">
          {error}
        </p>
      )}
    </form>
  )
}