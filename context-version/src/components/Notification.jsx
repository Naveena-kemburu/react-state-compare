import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useUIState, useUIDispatch } from '../context/UIContext';

function NotificationNaive() {
  const { state, dispatch } = useAppContext();
  const notification = state.ui.notification;
  const clear = () => dispatch({ type: 'CLEAR_NOTIFICATION' });

  useEffect(() => {
    if (!notification) return;
    const t = setTimeout(clear, 2500);
    return () => clearTimeout(t);
  }, [notification]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!notification) return null;
  return (
    <div className={`notification ${notification.type}`} role="alert">
      {notification.message}
    </div>
  );
}

function NotificationOptimized() {
  const { notification } = useUIState();
  const dispatch = useUIDispatch();
  const clear = () => dispatch({ type: 'CLEAR_NOTIFICATION' });

  useEffect(() => {
    if (!notification) return;
    const t = setTimeout(clear, 2500);
    return () => clearTimeout(t);
  }, [notification]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!notification) return null;
  return (
    <div className={`notification ${notification.type}`} role="alert">
      {notification.message}
    </div>
  );
}

export default function Notification({ mode = 'optimized' }) {
  return mode === 'naive' ? <NotificationNaive /> : <NotificationOptimized />;
}
