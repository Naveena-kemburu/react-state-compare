import RenderCounter from './RenderCounter';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import useAppStore from '../store/useAppStore';

export default function CartSidebar() {
  // Granular selectors — only re-renders when items or isOpen changes
  const items = useAppStore((s) => s.cart.items);
  const isOpen = useAppStore((s) => s.cart.isOpen);
  const toggleCart = useAppStore((s) => s.toggleCart);

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'open' : ''}`}
        onClick={toggleCart}
        aria-hidden="true"
      />
      <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`} aria-label="Shopping cart">
        <div className="cart-header">
          <h2>
            Your Cart
            <RenderCounter />
          </h2>
          <button className="close-btn" onClick={toggleCart} aria-label="Close cart">✕</button>
        </div>
        <div className="cart-items">
          {items.length === 0 ? (
            <p className="cart-empty">Your cart is empty 🛒</p>
          ) : (
            items.map((item) => <CartItem key={item.productId} item={item} />)
          )}
        </div>
        {items.length > 0 && <CartSummary items={items} />}
      </aside>
    </>
  );
}
