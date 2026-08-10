import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import TaskForm from './TaskForm'
import TaskList, { type Task } from './TaskList'
import FilterBar from './FilterBar'
import StatsPanel from './StatsPanel'
import { useTheme } from '../contexts/ThemeContext'

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
  | 'due-date'

export default function TaskApp({
  tasks = [],
  setTasks,
  showForm,
  countFormat,
  showFilterBar,
  showStatsPanel,
  onDelete,
}: TaskAppProps) {
  const { theme, toggleTheme } = useTheme()

  const [filter, setFilter] = useState<Filter>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('recent')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('')
  const [editingId, setEditingId] = useState<string | number | null>(null)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [search])

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
      dueDate?: string
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

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length

  const categories = [
    ...new Set(
      tasks
        .map((task) => task.category || 'General')
        .filter(Boolean)
    ),
  ]

  const statusFilteredTasks =
    filter === 'active'
      ? tasks.filter((task) => !task.completed)
      : filter === 'completed'
      ? tasks.filter((task) => task.completed)
      : tasks

  const categoryFilteredTasks = category
    ? statusFilteredTasks.filter(
        (task) => (task.category || 'General') === category
      )
    : statusFilteredTasks

  const searchText = debouncedSearch.trim().toLowerCase()

  const searchedTasks = searchText
    ? categoryFilteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchText) ||
          task.description.toLowerCase().includes(searchText)
      )
    : categoryFilteredTasks

  const sortedTasks = [...searchedTasks].sort((a, b) => {
    if (sortOrder === 'high-to-low') {
      const priority = {
        High: 3,
        Medium: 2,
        Low: 1,
      }

      return (
        priority[b.priority as keyof typeof priority] -
        priority[a.priority as keyof typeof priority]
      )
    }

    if (sortOrder === 'low-to-high') {
      const priority = {
        High: 3,
        Medium: 2,
        Low: 1,
      }

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

    if (sortOrder === 'due-date') {
      const aTime = a.dueDate
        ? new Date(a.dueDate).getTime()
        : Number.POSITIVE_INFINITY

      const bTime = b.dueDate
        ? new Date(b.dueDate).getTime()
        : Number.POSITIVE_INFINITY

      const safeATime = Number.isNaN(aTime)
        ? Number.POSITIVE_INFINITY
        : aTime

      const safeBTime = Number.isNaN(bTime)
        ? Number.POSITIVE_INFINITY
        : bTime

      return safeATime - safeBTime
    }

    return 0
  })

  const hasSearch = search.trim().length > 0
  const isSearching = search !== debouncedSearch

  return (
    <div
      data-theme={theme}
      style={{
        minHeight: '100vh',
        backgroundColor: theme === 'dark' ? '#111827' : '#fff',
        color: theme === 'dark' ? '#f9fafb' : '#111',
        padding: '1rem',
      }}
    >
      <button
        id="theme-toggle"
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${
          theme === 'light' ? 'dark' : 'light'
        } mode`}
        style={{
          padding: '8px 14px',
          marginBottom: '1rem',
          borderRadius: '4px',
          border: theme === 'dark'
            ? '1px solid #555'
            : '1px solid #ccc',
          backgroundColor: theme === 'dark' ? '#374151' : '#fff',
          color: theme === 'dark' ? '#fff' : '#111',
          cursor: 'pointer',
        }}
      >
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>

      {showFilterBar
        ? `Showing ${sortedTasks.length} of ${tasks.length} tasks`
        : countFormat === 'completed'
        ? `${completedCount} of ${tasks.length} completed`
        : `${tasks.length} Tasks`}

      {showStatsPanel && <StatsPanel tasks={tasks} />}

      {showForm && (
        <TaskForm
          onAddTask={handleAddTask}
          categories={categories}
        />
      )}

      {showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          search={search}
          onSearchChange={setSearch}
          category={category}
          categories={categories}
          onCategoryChange={setCategory}
        />
      )}

      {showFilterBar && isSearching && hasSearch && (
        <p id="searching-indicator">
          Searching...
        </p>
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
    </div>
  )
}