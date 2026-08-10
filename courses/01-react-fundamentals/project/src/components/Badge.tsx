import type { ReactNode, CSSProperties } from 'react'

export type BadgeVariant = 'category' | 'priority' | 'tag' | 'default'

interface BadgeProps {
  children?: ReactNode
  variant?: BadgeVariant
  id?: string
}

const VARIANT_STYLES: Record<BadgeVariant, CSSProperties> = {
  category: {
    backgroundColor: '#e0f2fe',
    color: '#075985',
  },
  priority: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  tag: {
    backgroundColor: '#eee',
    color: '#333',
  },
  default: {
    backgroundColor: '#eee',
    color: '#333',
  },
}

export default function Badge({
  children,
  variant = 'default',
  id,
}: BadgeProps) {
  return (
    <span
      id={id}
      style={{
        display: 'inline-block',
        padding: '3px 8px',
        marginRight: '5px',
        borderRadius: '10px',
        fontSize: '0.85em',
        ...VARIANT_STYLES[variant],
      }}
    >
      {children}
    </span>
  )
}