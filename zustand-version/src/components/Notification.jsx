import { useEffect } from 'react';
import useAppStore from '../store/useAppStore';

export default function Notification() {
  const notification = useAppStore((s) => s.ui.notification);
  const clearNotification = useAppStore((s) => s.clearNotification);

  useEffect(() => {
    if (!notification) return;
    const t = setTimeout(clearNotification, 2500);
    return () => clearTimeout(t);
  }, [notification, clearNotification]);

  if (!notification) return null;

  return (
    <div className={`notification ${notification.type}`} role="alert">
      {notification.message}
    </div>
  );
}
