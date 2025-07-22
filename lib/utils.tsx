'use client';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine Tailwind class names intelligently
 * 
 * @example
 * cn('btn', isActive && 'btn-primary')
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

/**
 * Truncate a long string with ellipsis
 * 
 * @example
 * truncate("abcdefghijklmnop", 10) // "abcdefg..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Format a date string to readable form
 * 
 * @example
 * formatDate("2025-07-19T15:32:00Z") // "Jul 19, 2025"
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}