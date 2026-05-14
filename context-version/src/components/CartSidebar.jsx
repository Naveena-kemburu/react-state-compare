import RenderCounter from './RenderCounter';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { useAppContext } from '../context/AppContext';
import { useCartState, useCartDispatch } from '../context/CartContext';

function CartSidebarNaive() {
  const { state, dispatch } = useAppContext();
  const { items, isOpen } = state.cart;
  const close = () => dispatch({ type: 'TOGGLE_CART' });

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={close} aria-hidden="true" />
      <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`} aria-label="Shopping cart">
        <div className="cart-header">
          <h2>Your Cart <RenderCounter /></h2>
          <button className="close-btn" onClick={close} aria-label="Close cart">✕</button>
        </div>
        <div className="cart-items">
          {items.length === 0
            ? <p className="cart-empty">Your cart is empty 🛒</p>
            : items.map(item => <CartItem key={item.productId} item={item} mode="naive" />)
          }
        </div>
        {items.length > 0 && <CartSummary items={items} />}
      </aside>
    </>
  );
}

function CartSidebarOptimized() {
  const { items, isOpen } = useCartState();
  const dispatch = useCartDispatch();
  const close = () => dispatch({ type: 'TOGGLE_CART' });

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={close} aria-hidden="true" />
      <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`} aria-label="Shopping cart">
        <div className="cart-header">
          <h2>Your Cart <RenderCounter /></h2>
          <button className="close-btn" onClick={close} aria-label="Close cart">✕</button>
        </div>
        <div className="cart-items">
          {items.length === 0
            ? <p className="cart-empty">Your cart is empty 🛒</p>
            : items.map(item => <CartItem key={item.productId} item={item} mode="optimized" />)
          }
        </div>
        {items.length > 0 && <CartSummary items={items} />}
      </aside>
    </>
  );
}

export default function CartSidebar({ mode = 'optimized' }) {
  return mode === 'naive' ? <CartSidebarNaive /> : <CartSidebarOptimized />;
}
