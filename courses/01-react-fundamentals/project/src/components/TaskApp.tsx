import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import TaskForm from './TaskForm'
import TaskList, { type Task } from './TaskList'
import FilterBar from './FilterBar'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  dispatch?: (action: { type: string; payload?: unknown }) => void
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
}

type Filter = 'all' | 'active' | 'completed'

type SortOrder =
  | 'recent'
  | 'high-to-low'
  | 'low-to-high'
  | 'alphabetical'

export default function TaskApp({
  tasks = [],
  setTasks,
  showForm,
  countFormat,
  showFilterBar,
  onDelete,
}: TaskAppProps) {
  const [filter, setFilter] = useState<Filter>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('recent')
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState<string | number | null>(null)

  const handleAddTask = (task: Record<string, unknown>) => {
    if (!setTasks) return

    setTasks((prev) => [...prev, task as Task])
  }

  const handleToggle = (id: string | number) => {
    if (!setTasks) return

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const handleUpdateTask = (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: string
    }
  ) => {
    if (!setTasks) return

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updates }
          : task
      )
    )

    setEditingId(null)
  }

  const completedCount = tasks.filter((task) => task.completed).length

  const filteredTasks =
    filter === 'active'
      ? tasks.filter((task) => !task.completed)
      : filter === 'completed'
        ? tasks.filter((task) => task.completed)
        : tasks

  const searchText = search.trim().toLowerCase()

  const searchedTasks = searchText
    ? filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchText) ||
          task.description.toLowerCase().includes(searchText)
      )
    : filteredTasks

  const sortedTasks = [...searchedTasks].sort((a, b) => {
    if (sortOrder === 'high-to-low') {
      const priority = { High: 3, Medium: 2, Low: 1 }

      return (
        priority[b.priority as keyof typeof priority] -
        priority[a.priority as keyof typeof priority]
      )
    }

    if (sortOrder === 'low-to-high') {
      const priority = { High: 3, Medium: 2, Low: 1 }

      return (
        priority[a.priority as keyof typeof priority] -
        priority[b.priority as keyof typeof priority]
      )
    }

    if (sortOrder === 'alphabetical') {
      return a.title.localeCompare(b.title, undefined, {
        sensitivity: 'base',
      })
    }

    return 0
  })

  const hasSearch = search.trim().length > 0

  return (
    <>
      <h2 id="task-count">
        {showFilterBar
          ? `Showing ${sortedTasks.length} of ${tasks.length} tasks`
          : countFormat === 'completed'
            ? `${completedCount} of ${tasks.length} completed`
            : `${tasks.length} Tasks`}
      </h2>

      {showForm && (
        <TaskForm onAddTask={handleAddTask} />
      )}

      {showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          search={search}
          onSearchChange={setSearch}
        />
      )}

      {showFilterBar && sortedTasks.length === 0 ? (
        <p id="filter-empty-message">
          {hasSearch
            ? 'No tasks found'
            : 'No tasks match this filter'}
        </p>
      ) : (
        <TaskList
          tasks={sortedTasks}
          onToggle={handleToggle}
          onDelete={onDelete}
          editingId={editingId}
          onStartEdit={setEditingId}
          onCancelEdit={() => setEditingId(null)}
          onUpdateTask={handleUpdateTask}
        />
      )}
    </>
  )
}