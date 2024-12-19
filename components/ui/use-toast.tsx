import { useState, useCallback } from 'react'

interface Toast {
  id: number
  title: string
  description?: string
  duration?: number
  variant?: 'default' | 'destructive'
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: number) => void
}

const useToast = (): ToastContextValue => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    setToasts((prevToasts) => [
      ...prevToasts,
      { ...toast, id: Date.now() },
    ])
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  return { toasts, addToast, removeToast }
}

export { useToast }
export type { Toast, ToastContextValue }

