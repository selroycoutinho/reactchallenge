import { useState } from 'react'

interface TaskFormProps {
  onAddTask?: (task: Record<string, unknown>) => void
  categories?: string[]
}

export default function TaskForm({
  onAddTask,
  categories = [],
}: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Low')
  const [category, setCategory] = useState('General')
  const [tags, setTags] = useState('')
  const [error, setError] = useState('')

  const availableCategories = [
    'General',
    ...categories.filter((item) => item !== 'General'),
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (title.trim() === '') {
      setError('Title is required')
      return
    }

    setError('')

    const parsedTags = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    onAddTask?.({
      id: Date.now(),
      title: title.trim(),
      description,
      priority,
      completed: false,
      category,
      tags: parsedTags,
    })

    setTitle('')
    setDescription('')
    setPriority('Low')
    setCategory('General')
    setTags('')
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

      <select
        id="task-category-input"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {availableCategories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <input
        id="task-tags-input"
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button type="submit">Add Task</button>

      {error && (
        <p id="task-form-error">
          {error}
        </p>
      )}
    </form>
  )
}