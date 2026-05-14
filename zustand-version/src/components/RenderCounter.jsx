import { useRef } from 'react';

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
