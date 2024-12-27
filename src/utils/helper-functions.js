import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function lerpAngle(start, end, t) {
  // Normalize angles to be between 0 and 2π
  start = start % (2 * Math.PI);
  end = end % (2 * Math.PI);
  
  // Convert negative angles to positive
  if (start < 0) start += 2 * Math.PI;
  if (end < 0) end += 2 * Math.PI;
  
  // Find the shortest path
  let diff = end - start;
  if (Math.abs(diff) > Math.PI) {
    if (diff > 0) {
      diff = diff - 2 * Math.PI;
    } else {
      diff = diff + 2 * Math.PI;
    }
  }
  
  return start + diff * t;
}

export function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
