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
}: TaskAppProps) {
  const handleAddTask = (task: Record<string, unknown>) => {
    if (!setTasks) return

    setTasks((prev) => [...prev, task as Task])
  }

  return (
    <>
      <h2 id="task-count">{tasks.length} Tasks</h2>

      {showForm && (
        <TaskForm onAddTask={handleAddTask} />
      )}

      <TaskList tasks={tasks} />
    </>
  )
}