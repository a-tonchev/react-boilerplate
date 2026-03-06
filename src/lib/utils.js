import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function createRipple(e) {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();
  const diameter = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - diameter / 2;
  const y = e.clientY - rect.top - diameter / 2;
  const ripple = document.createElement('span');
  ripple.style.cssText = [
    `position:absolute;width:${diameter}px;height:${diameter}px`,
    `left:${x}px;top:${y}px;border-radius:50%`,
    'background:rgba(255,255,255,0.35);transform:scale(0)',
    'animation:ripple-effect 0.5s ease-out forwards;pointer-events:none',
  ].join(';');
  button.appendChild(ripple);
  setTimeout(() => ripple.remove(), 500);
}
