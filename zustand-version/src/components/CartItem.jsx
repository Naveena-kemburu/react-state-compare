import RenderCounter from './RenderCounter';
import useAppStore from '../store/useAppStore';

export default function CartItem({ item }) {
  const updateQuantity = useAppStore((s) => s.updateQuantity);
  const removeFromCart = useAppStore((s) => s.removeFromCart);

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
          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
          aria-label="Decrease quantity"
        >−</button>
        <span className="qty-display">{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
          aria-label="Increase quantity"
        >+</button>
      </div>
      <button
        className="remove-btn"
        onClick={() => removeFromCart(item.productId)}
        aria-label="Remove item"
      >🗑️</button>
    </div>
  );
}
