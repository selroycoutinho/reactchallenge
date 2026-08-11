import React, { useCallback, useMemo } from 'react'
import TaskCard from './TaskCard'

export interface Task {
  id: string | number
  title: string
  description: string
  priority: string
  completed: boolean
  category?: string
  tags?: string[]
  dueDate?: string | number
}

interface TaskListProps {
  tasks?: Task[]
  countText?: string
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void
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

const HARDCODED_TASKS: Task[] = [
  {
    id: 1,
    title: 'Task One',
    description: 'First hardcoded task',
    priority: 'Priority: High',
    completed: false,
  },
  {
    id: 2,
    title: 'Task Two',
    description: 'Second hardcoded task',
    priority: 'Priority: Medium',
    completed: false,
  },
  {
    id: 3,
    title: 'Task Three',
    description: 'Third hardcoded task',
    priority: 'Priority: Low',
    completed: false,
  },
]

function TaskList({
  tasks,
  onToggle,
  onDelete,
  editingId,
  onStartEdit,
  onCancelEdit,
  onUpdateTask,
}: TaskListProps) {
  const list = useMemo(
    () => tasks ?? HARDCODED_TASKS,
    [tasks]
  )

  const renderTask = useCallback(
    (task: Task) => (
      <TaskCard
        key={task.id}
        taskId={task.id}
        title={task.title}
        description={task.description}
        priority={task.priority}
        category={task.category}
        tags={task.tags}
        dueDate={task.dueDate}
        completed={task.completed}
        onToggle={onToggle}
        onDelete={onDelete}
        editingId={editingId}
        onStartEdit={onStartEdit}
        onCancelEdit={onCancelEdit}
        onUpdateTask={onUpdateTask}
      />
    ),
    [
      onToggle,
      onDelete,
      editingId,
      onStartEdit,
      onCancelEdit,
      onUpdateTask,
    ]
  )

  return (
    <section id="task-list">
      {list.map(renderTask)}
    </section>
  )
}

export default React.memo(TaskList)