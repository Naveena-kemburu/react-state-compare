import { useRef } from 'react';

/**
 * Tracks and displays how many times the parent component has rendered.
 * Only visible in development mode.
 */
export default function RenderCounter() {
  const count = useRef(0);
  count.current += 1;

  if (import.meta.env.PROD) return null;

  return (
    <small className="render-counter" data-testid="render-count">
      {count.current}
    </small>
  );
}
