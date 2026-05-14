import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNotification, clearNotification } from '../store/uiSlice';

export default function Notification() {
  const dispatch = useDispatch();
  const notification = useSelector(selectNotification);

  useEffect(() => {
    if (!notification) return;
    const t = setTimeout(() => dispatch(clearNotification()), 2500);
    return () => clearTimeout(t);
  }, [notification, dispatch]);

  if (!notification) return null;

  return (
    <div className={`notification ${notification.type}`} role="alert">
      {notification.message}
    </div>
  );
}
