import { useAppContext } from '../context/AppContext';
import { useCartState } from '../context/CartContext';

function CartItemCountNaive() {
  const { state } = useAppContext();
  const total = state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
  if (total === 0) return null;
  return <span className="cart-badge">{total}</span>;
}

function CartItemCountOptimized() {
  const { items } = useCartState();
  const total = items.reduce((sum, i) => sum + i.quantity, 0);
  if (total === 0) return null;
  return <span className="cart-badge">{total}</span>;
}

export default function CartItemCount({ mode = 'optimized' }) {
  return mode === 'naive' ? <CartItemCountNaive /> : <CartItemCountOptimized />;
}
