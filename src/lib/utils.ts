import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function getDateTimeFormatter(options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    ...options,
  }).format
}

export function formatDate(date: Date) {
  return getDateTimeFormatter()(date)
}
