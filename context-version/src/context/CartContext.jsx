/**
 * OPTIMIZED SPLIT CONTEXT — Cart slice
 * Components that only need cart data subscribe here and won't re-render
 * when user or ui state changes.
 */
import { createContext, useContext, useReducer } from 'react';

const initialCart = { items: [], isOpen: false };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product } = action.payload;
      const existing = state.items.find(i => i.productId === product.id);
      const items = existing
        ? state.items.map(i =>
            i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [
            ...state.items,
            { productId: product.id, name: product.name, quantity: 1, price: product.price },
          ];
      return { ...state, items };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(i => i.productId !== action.payload.productId) };
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.productId !== productId) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.productId === productId ? { ...i, quantity } : i
        ),
      };
    }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

const CartStateContext = createContext(null);
const CartDispatchContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCart);
  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCartState() {
  const ctx = useContext(CartStateContext);
  if (ctx === null) throw new Error('useCartState must be used within CartProvider');
  return ctx;
}

export function useCartDispatch() {
  const ctx = useContext(CartDispatchContext);
  if (ctx === null) throw new Error('useCartDispatch must be used within CartProvider');
  return ctx;
}
