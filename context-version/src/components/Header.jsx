import RenderCounter from './RenderCounter';
import UserInfo from './UserInfo';
import CartItemCount from './CartItemCount';
import ThemeSwitcher from './ThemeSwitcher';
import { useAppContext } from '../context/AppContext';
import { useCartDispatch } from '../context/CartContext';

function HeaderNaive() {
  const { dispatch } = useAppContext();
  return (
    <header className="app-header">
      <div className="logo">
        🛒 ShopBench
        <RenderCounter />
      </div>
      <div className="header-actions">
        <UserInfo mode="naive" />
        <ThemeSwitcher mode="naive" />
        <button className="cart-btn" onClick={() => dispatch({ type: 'TOGGLE_CART' })} aria-label="Open cart">
          🛍️ Cart
          <CartItemCount mode="naive" />
        </button>
      </div>
    </header>
  );
}

function HeaderOptimized() {
  const dispatch = useCartDispatch();
  return (
    <header className="app-header">
      <div className="logo">
        🛒 ShopBench
        <RenderCounter />
      </div>
      <div className="header-actions">
        <UserInfo mode="optimized" />
        <ThemeSwitcher mode="optimized" />
        <button className="cart-btn" onClick={() => dispatch({ type: 'TOGGLE_CART' })} aria-label="Open cart">
          🛍️ Cart
          <CartItemCount mode="optimized" />
        </button>
      </div>
    </header>
  );
}

export default function Header({ mode = 'optimized' }) {
  return mode === 'naive' ? <HeaderNaive /> : <HeaderOptimized />;
}
