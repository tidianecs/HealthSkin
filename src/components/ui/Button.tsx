import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'outline'
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 rounded-pill px-7 py-3.5 text-sm font-semibold transition-all duration-200 cursor-pointer'

  const variants = {
    primary:
      'bg-[var(--green-dark)] text-white hover:opacity-90 hover:-translate-y-0.5',
    outline:
      'bg-transparent border-2 border-[#2d4a2d] text-[#2d4a2d] dark:border-[#4a8a4a] dark:text-[#4a8a4a] hover:bg-[#2d4a2d] hover:text-white dark:hover:bg-[#4a8a4a] dark:hover:text-white',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}