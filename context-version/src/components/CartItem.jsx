import RenderCounter from './RenderCounter';
import { useAppContext } from '../context/AppContext';
import { useCartDispatch } from '../context/CartContext';

function CartItemNaive({ item }) {
  const { dispatch } = useAppContext();
  const updateQty = (delta) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: item.productId, quantity: item.quantity + delta } });
  const remove = () =>
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId: item.productId } });

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <div className="cart-item-name">{item.name} <RenderCounter /></div>
        <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
      </div>
      <div className="qty-controls">
        <button className="qty-btn" onClick={() => updateQty(-1)} aria-label="Decrease quantity">−</button>
        <span className="qty-display">{item.quantity}</span>
        <button className="qty-btn" onClick={() => updateQty(1)} aria-label="Increase quantity">+</button>
      </div>
      <button className="remove-btn" onClick={remove} aria-label="Remove item">🗑️</button>
    </div>
  );
}

function CartItemOptimized({ item }) {
  const dispatch = useCartDispatch();
  const updateQty = (delta) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: item.productId, quantity: item.quantity + delta } });
  const remove = () =>
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId: item.productId } });

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <div className="cart-item-name">{item.name} <RenderCounter /></div>
        <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
      </div>
      <div className="qty-controls">
        <button className="qty-btn" onClick={() => updateQty(-1)} aria-label="Decrease quantity">−</button>
        <span className="qty-display">{item.quantity}</span>
        <button className="qty-btn" onClick={() => updateQty(1)} aria-label="Increase quantity">+</button>
      </div>
      <button className="remove-btn" onClick={remove} aria-label="Remove item">🗑️</button>
    </div>
  );
}

export default function CartItem({ item, mode = 'optimized' }) {
  return mode === 'naive' ? <CartItemNaive item={item} /> : <CartItemOptimized item={item} />;
}
