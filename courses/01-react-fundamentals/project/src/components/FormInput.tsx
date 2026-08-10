import type { ChangeEvent } from 'react'

interface FormInputProps {
  id?: string
  value?: string
  onChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  label?: string
  type?: string
  placeholder?: string
  error?: string
  ariaLabel?: string
}

export default function FormInput({
  id,
  value = '',
  onChange,
  label,
  type = 'text',
  placeholder,
  error,
  ariaLabel,
}: FormInputProps) {
  const resolvedAriaLabel = ariaLabel ?? label ?? placeholder

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}

      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={resolvedAriaLabel}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={resolvedAriaLabel}
        />
      )}

      {error && <p id={id ? `${id}-error` : undefined}>{error}</p>}
    </div>
  )
}