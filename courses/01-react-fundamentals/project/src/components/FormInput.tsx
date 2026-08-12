import type {
  ChangeEvent,
  RefObject,
} from 'react'

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
  inputRef?: RefObject<HTMLInputElement | null>
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
  inputRef,
}: FormInputProps) {
  const resolvedAriaLabel =
    ariaLabel ?? label ?? placeholder

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
          ref={inputRef}
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={resolvedAriaLabel}
        />
      )}

      {error && (
        <p id={id ? `${id}-error` : undefined}>
          {error}
        </p>
      )}
    </div>
  )
}