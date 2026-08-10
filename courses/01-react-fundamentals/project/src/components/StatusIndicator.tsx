import type { CSSProperties } from 'react'

export type TaskStatus =
  | 'overdue'
  | 'due-today'
  | 'due-soon'
  | 'completed'

interface StatusIndicatorProps {
  status?: string
  label?: string
}

interface StatusConfigEntry {
  label: string
  style: CSSProperties
}

const STATUS_CONFIG: Record<TaskStatus, StatusConfigEntry> = {
  overdue: {
    label: 'Overdue',
    style: { backgroundColor: '#dc2626', color: '#fff' },
  },
  'due-today': {
    label: 'Due Today',
    style: { backgroundColor: '#fde68a', color: '#111' },
  },
  'due-soon': {
    label: 'Due Soon',
    style: { backgroundColor: '#bfdbfe', color: '#111' },
  },
  completed: {
    label: 'Completed',
    style: { backgroundColor: '#16a34a', color: '#fff' },
  },
}

export default function StatusIndicator({
  status,
  label,
}: StatusIndicatorProps) {
  if (!status || !(status in STATUS_CONFIG)) {
    return null
  }

  const config = STATUS_CONFIG[status as TaskStatus]

  return (
    <span
      data-status={status}
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        marginLeft: '5px',
        borderRadius: '10px',
        fontSize: '0.85em',
        fontWeight: 'bold',
        ...config.style,
      }}
    >
      {label ?? config.label}
    </span>
  )
}