import RenderCounter from './RenderCounter';
import useAppStore from '../store/useAppStore';

// Granular selectors — this component only re-renders when cartItemCount,
// user.name, ui.theme, or toggleCart changes.
export default function Header() {
  const cartItemCount = useAppStore((s) =>
    s.cart.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const userName = useAppStore((s) => s.user.name);
  const isLoggedIn = useAppStore((s) => s.user.isLoggedIn);
  const theme = useAppStore((s) => s.ui.theme);
  const toggleCart = useAppStore((s) => s.toggleCart);
  const setTheme = useAppStore((s) => s.setTheme);

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
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button className="cart-btn" onClick={toggleCart} aria-label="Open cart">
          🛍️ Cart
          {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </button>
      </div>
    </header>
  );
}
