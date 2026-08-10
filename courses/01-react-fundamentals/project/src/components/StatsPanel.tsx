import { useMemo } from 'react'
import type { Task } from './TaskList'

interface StatsPanelProps {
  tasks?: Task[]
}

export default function StatsPanel({
  tasks = [],
}: StatsPanelProps) {
  const stats = useMemo(() => {
    const total = tasks.length

    const completed = tasks.filter(
      (task) => task.completed
    ).length

    const active = tasks.filter(
      (task) => !task.completed
    ).length

    const completedPercentage =
      total === 0
        ? 0
        : Math.round((completed / total) * 100)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const overdue = tasks.filter((task) => {
      if (task.completed || !task.dueDate) {
        return false
      }

      const dueDate = new Date(task.dueDate)

      if (Number.isNaN(dueDate.getTime())) {
        return false
      }

      dueDate.setHours(0, 0, 0, 0)

      return dueDate.getTime() < today.getTime()
    }).length

    const categories: Record<string, number> = {}

    tasks.forEach((task) => {
      const category = task.category || 'General'
      categories[category] =
        (categories[category] || 0) + 1
    })

    const priorities: Record<string, number> = {}

    tasks.forEach((task) => {
      const priority = task.priority || 'Unknown'
      priorities[priority] =
        (priorities[priority] || 0) + 1
    })

    return {
      total,
      completed,
      active,
      overdue,
      completedPercentage,
      categories,
      priorities,
    }
  }, [tasks])

  return (
    <section id="stats-panel">
      <h2>Task Statistics</h2>

      <div>
        <p>Total tasks</p>
        <strong id="stats-total">{stats.total}</strong>
      </div>

      <div>
        <p>Completed</p>
        <strong id="stats-completed">
          {stats.completed} ({stats.completedPercentage}%)
        </strong>

        <div
          role="progressbar"
          aria-label="Task completion progress"
          aria-valuenow={stats.completedPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{
            background: '#eee',
            borderRadius: '4px',
            overflow: 'hidden',
            height: '8px',
            width: '100%',
          }}
        >
          <div
            style={{
              width: `${stats.completedPercentage}%`,
              background: '#c2410c',
              height: '100%',
            }}
          />
        </div>
      </div>

      <div>
        <p>Active</p>
        <strong id="stats-active">{stats.active}</strong>
      </div>

      <div>
        <p>Overdue</p>
        <strong id="stats-overdue">{stats.overdue}</strong>
      </div>

      <div>
        <h3>By Category</h3>

        {Object.entries(stats.categories).map(
          ([category, count]) => (
            <p key={category}>
              {category}: {count}
            </p>
          )
        )}
      </div>

      <div>
        <h3>By Priority</h3>

        {Object.entries(stats.priorities).map(
          ([priority, count]) => (
            <p key={priority}>
              {priority}: {count}
            </p>
          )
        )}
      </div>
    </section>
  )
}