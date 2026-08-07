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

export default function TaskApp({
  tasks = [],
  setTasks,
  showForm,
  countFormat,
  showFilterBar,
  onDelete,
}: TaskAppProps) {
  const [filter, setFilter] = useState<Filter>('all')

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

  const completedCount = tasks.filter((task) => task.completed).length

  const filteredTasks =
    filter === 'active'
      ? tasks.filter((task) => !task.completed)
      : filter === 'completed'
        ? tasks.filter((task) => task.completed)
        : tasks

  return (
    <>
      <h2 id="task-count">
        {showFilterBar
          ? `Showing ${filteredTasks.length} of ${tasks.length} tasks`
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
        />
      )}

      {showFilterBar && filteredTasks.length === 0 ? (
        <p id="filter-empty-message">
          No tasks match this filter
        </p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onDelete={onDelete}
        />
      )}
    </>
  )
}