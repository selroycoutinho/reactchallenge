import type { Dispatch, SetStateAction } from 'react'
import TaskForm from './TaskForm'
import TaskList, { type Task } from './TaskList'

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

export default function TaskApp({
  tasks = [],
  setTasks,
  showForm,
  countFormat,
  onDelete,
}: TaskAppProps) {
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

  return (
    <>
      <h2 id="task-count">
        {countFormat === 'completed'
          ? `${completedCount} of ${tasks.length} completed`
          : `${tasks.length} Tasks`}
      </h2>

      {showForm && (
        <TaskForm onAddTask={handleAddTask} />
      )}

      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onDelete={onDelete}
      />
    </>
  )
}