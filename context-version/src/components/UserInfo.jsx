import { useAppContext } from '../context/AppContext';
import { useUserState } from '../context/UserContext';

function UserInfoNaive() {
  const { state } = useAppContext();
  const user = state.user;
  return (
    <div className="user-info">
      {user.isLoggedIn ? <>👤 <strong>{user.name}</strong></> : 'Guest'}
    </div>
  );
}

function UserInfoOptimized() {
  const user = useUserState();
  return (
    <div className="user-info">
      {user.isLoggedIn ? <>👤 <strong>{user.name}</strong></> : 'Guest'}
    </div>
  );
}

/**
 * mode="naive"     → reads from single AppContext (re-renders on any state change)
 * mode="optimized" → reads from UserContext only (re-renders only on user changes)
 */
export default function UserInfo({ mode = 'optimized' }) {
  return mode === 'naive' ? <UserInfoNaive /> : <UserInfoOptimized />;
}
