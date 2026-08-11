import { useEffect, useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const savedValue = localStorage.getItem(key)

      if (!savedValue) {
        return initialValue
      }

      return JSON.parse(savedValue) as T
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      )
    } catch {
      // Ignore localStorage errors
    }
  }, [key, value])

  return [value, setValue]
}