import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import TaskForm from './TaskForm'
import TaskList, { type Task } from './TaskList'
import FilterBar from './FilterBar'
import StatsPanel from './StatsPanel'
import ErrorBoundary from './ErrorBoundary'
import { useTheme } from '../contexts/ThemeContext'
import {
  ADD_TASK,
  TOGGLE_TASK,
  UPDATE_TASK,
} from '../reducers/taskReducer'

interface TaskAppProps {
  tasks?: Task[]
  dispatch?: (action: {
    type: string
    payload?: unknown
  }) => void
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

function TaskApp({
  tasks = [],
  dispatch,
  showForm,
  countFormat,
  showFilterBar,
  showStatsPanel,
  onDelete,
  linkToTaskDetail,
}: TaskAppProps) {
  const { theme, toggleTheme } = useTheme()

  const [filter, setFilter] = useState<Filter>('all')
  const [sortOrder, setSortOrder] =
    useState<SortOrder>('recent')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('')
  const [editingId, setEditingId] = useState<
    string | number | null
  >(null)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [search])

  const handleAddTask = useCallback(
    (task: Record<string, unknown>) => {
      if (!dispatch) return

      dispatch({
        type: ADD_TASK,
        payload: task as Task,
      })
    },
    [dispatch]
  )

  const handleToggle = useCallback(
    (id: string | number) => {
      if (!dispatch) return

      dispatch({
        type: TOGGLE_TASK,
        payload: id,
      })
    },
    [dispatch]
  )

  const handleUpdateTask = useCallback(
    (
      id: string | number,
      updates: {
        title: string
        description: string
        priority: string
        dueDate?: string
      }
    ) => {
      if (!dispatch) return

      dispatch({
        type: UPDATE_TASK,
        payload: {
          id,
          ...updates,
        },
      })

      setEditingId(null)
    },
    [dispatch]
  )

  const handleStartEdit = useCallback(
    (id: string | number) => {
      setEditingId(id)
    },
    []
  )

  const handleCancelEdit = useCallback(() => {
    setEditingId(null)
  }, [])

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  )

  const categories = useMemo(
    () => [
      ...new Set(
        tasks
          .map((task) => task.category || 'General')
          .filter(Boolean)
      ),
    ],
    [tasks]
  )

  const sortedTasks = useMemo(() => {
    const statusFilteredTasks =
      filter === 'active'
        ? tasks.filter((task) => !task.completed)
        : filter === 'completed'
        ? tasks.filter((task) => task.completed)
        : tasks

    const categoryFilteredTasks = category
      ? statusFilteredTasks.filter(
          (task) =>
            (task.category || 'General') === category
        )
      : statusFilteredTasks

    const searchText = debouncedSearch
      .trim()
      .toLowerCase()

    const searchedTasks = searchText
      ? categoryFilteredTasks.filter(
          (task) =>
            task.title
              .toLowerCase()
              .includes(searchText) ||
            task.description
              .toLowerCase()
              .includes(searchText)
        )
      : categoryFilteredTasks

    return [...searchedTasks].sort((a, b) => {
      if (sortOrder === 'high-to-low') {
        const priority = {
          High: 3,
          Medium: 2,
          Low: 1,
        }

        return (
          priority[
            b.priority as keyof typeof priority
          ] -
          priority[
            a.priority as keyof typeof priority
          ]
        )
      }

      if (sortOrder === 'low-to-high') {
        const priority = {
          High: 3,
          Medium: 2,
          Low: 1,
        }

        return (
          priority[
            a.priority as keyof typeof priority
          ] -
          priority[
            b.priority as keyof typeof priority
          ]
        )
      }

      if (sortOrder === 'alphabetical') {
        return a.title.localeCompare(
          b.title,
          undefined,
          {
            sensitivity: 'base',
          }
        )
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
  }, [
    tasks,
    filter,
    category,
    debouncedSearch,
    sortOrder,
  ])

  const hasSearch = search.trim().length > 0
  const isSearching = search !== debouncedSearch

  return (
    <div
      data-theme={theme}
      style={{
        minHeight: '100vh',
        backgroundColor:
          theme === 'dark' ? '#111827' : '#fff',
        color:
          theme === 'dark' ? '#f9fafb' : '#111',
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
          border:
            theme === 'dark'
              ? '1px solid #555'
              : '1px solid #ccc',
          backgroundColor:
            theme === 'dark' ? '#374151' : '#fff',
          color:
            theme === 'dark' ? '#fff' : '#111',
          cursor: 'pointer',
        }}
      >
        {theme === 'light'
          ? 'Dark Mode'
          : 'Light Mode'}
      </button>

      {showFilterBar
        ? `Showing ${sortedTasks.length} of ${tasks.length} tasks`
        : countFormat === 'completed'
        ? `${completedCount} of ${tasks.length} completed`
        : `${tasks.length} Tasks`}

      {showStatsPanel && (
        <StatsPanel tasks={tasks} />
      )}

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

      {showFilterBar &&
        isSearching &&
        hasSearch && (
          <p id="searching-indicator">
            Searching...
          </p>
        )}

      {showFilterBar &&
      sortedTasks.length === 0 ? (
        <p id="filter-empty-message">
          {hasSearch
            ? 'No tasks found'
            : 'No tasks match this filter'}
        </p>
      ) : (
        <ErrorBoundary>
          <TaskList
            tasks={sortedTasks}
            onToggle={handleToggle}
            onDelete={onDelete}
            editingId={editingId}
            onStartEdit={handleStartEdit}
            onCancelEdit={handleCancelEdit}
            onUpdateTask={handleUpdateTask}
            linkToTaskDetail={linkToTaskDetail}
          />
        </ErrorBoundary>
      )}
    </div>
  )
}

export default React.memo(TaskApp)