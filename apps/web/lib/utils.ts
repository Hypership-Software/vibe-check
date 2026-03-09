import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ZodError } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function prettifyError(error: ZodError): string {
  return error.issues.map((issue) => issue.message).join(', ');
}
