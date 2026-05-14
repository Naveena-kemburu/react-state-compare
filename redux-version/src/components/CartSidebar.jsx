import { useSelector, useDispatch } from 'react-redux';
import RenderCounter from './RenderCounter';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { selectCartItems, selectCartIsOpen, toggleCart } from '../store/cartSlice';

export default function CartSidebar() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const isOpen = useSelector(selectCartIsOpen);

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => dispatch(toggleCart())}
        aria-hidden="true"
      />
      <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`} aria-label="Shopping cart">
        <div className="cart-header">
          <h2>
            Your Cart
            <RenderCounter />
          </h2>
          <button className="close-btn" onClick={() => dispatch(toggleCart())} aria-label="Close cart">✕</button>
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
