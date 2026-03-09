import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DateTime } from "luxon"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string, format = "LLL dd, yyyy"): string {
  const dt = date instanceof Date
    ? DateTime.fromJSDate(date)
    : DateTime.fromISO(date);
  return dt.toFormat(format);
}

export function formatRelative(date: Date | string): string {
  const dt = date instanceof Date
    ? DateTime.fromJSDate(date)
    : DateTime.fromISO(date);
  return dt.toRelative() ?? dt.toFormat("LLL dd, yyyy");
}

export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
}
