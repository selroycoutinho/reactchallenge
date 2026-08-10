import type { ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface ButtonProps {
  children?: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: ButtonVariant
  disabled?: boolean
  id?: string
}

const VARIANT_STYLES: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: '#c2410c',
    color: '#fff',
    border: '1px solid #c2410c',
  },
  secondary: {
    backgroundColor: '#fff',
    color: '#111',
    border: '1px solid #ccc',
  },
  danger: {
    backgroundColor: '#dc2626',
    color: '#fff',
    border: '1px solid #dc2626',
  },
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  id,
}: ButtonProps) {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '0.9em',
        ...VARIANT_STYLES[variant],
      }}
    >
      {children}
    </button>
  )
}