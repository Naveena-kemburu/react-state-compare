import { useDispatch } from 'react-redux';
import RenderCounter from './RenderCounter';
import { updateQuantity, removeFromCart } from '../store/cartSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <div className="cart-item-name">
          {item.name}
          <RenderCounter />
        </div>
        <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
      </div>
      <div className="qty-controls">
        <button
          className="qty-btn"
          onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity - 1 }))}
          aria-label="Decrease quantity"
        >−</button>
        <span className="qty-display">{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }))}
          aria-label="Increase quantity"
        >+</button>
      </div>
      <button
        className="remove-btn"
        onClick={() => dispatch(removeFromCart(item.productId))}
        aria-label="Remove item"
      >🗑️</button>
    </div>
  );
}
