import { useSelector, useDispatch } from 'react-redux';
import RenderCounter from './RenderCounter';
import { selectCartItemCount, toggleCart } from '../store/cartSlice';
import { selectUserName, selectIsLoggedIn } from '../store/userSlice';
import { selectTheme, setTheme } from '../store/uiSlice';

export default function Header() {
  const dispatch = useDispatch();

  // Primitive selectors — no unnecessary re-renders
  const cartItemCount = useSelector(selectCartItemCount);
  const userName = useSelector(selectUserName);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const theme = useSelector(selectTheme);

  return (
    <header className="app-header">
      <div className="logo">
        🛒 ShopBench
        <RenderCounter />
      </div>
      <div className="header-actions">
        <div className="user-info">
          {isLoggedIn ? <>👤 <strong>{userName}</strong></> : 'Guest'}
        </div>
        <button
          className="theme-btn"
          onClick={() => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button className="cart-btn" onClick={() => dispatch(toggleCart())} aria-label="Open cart">
          🛍️ Cart
          {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </button>
      </div>
    </header>
  );
}
