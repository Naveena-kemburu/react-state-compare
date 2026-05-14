/**
 * NAIVE SINGLE CONTEXT
 * All state (cart, user, ui) lives in one context.
 * Any state change causes ALL consumers to re-render — this is the performance trap.
 */
import { createContext, useContext, useReducer } from 'react';

// ── Initial State ──────────────────────────────────────────────────────────────
const initialState = {
  cart: {
    items: [],
    isOpen: false,
  },
  user: {
    name: 'Jane Doe',
    isLoggedIn: true,
  },
  ui: {
    theme: 'light',
    notification: null,
  },
};

// ── Reducer ────────────────────────────────────────────────────────────────────
function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product } = action.payload;
      const existing = state.cart.items.find(i => i.productId === product.id);
      const items = existing
        ? state.cart.items.map(i =>
            i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [
            ...state.cart.items,
            { productId: product.id, name: product.name, quantity: 1, price: product.price },
          ];
      return { ...state, cart: { ...state.cart, items } };
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.filter(i => i.productId !== action.payload.productId),
        },
      };
    }
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cart: { ...state.cart, items: state.cart.items.filter(i => i.productId !== productId) },
        };
      }
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.map(i =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        },
      };
    }
    case 'TOGGLE_CART':
      return { ...state, cart: { ...state.cart, isOpen: !state.cart.isOpen } };
    case 'SET_THEME':
      return { ...state, ui: { ...state.ui, theme: action.payload.theme } };
    case 'SHOW_NOTIFICATION':
      return { ...state, ui: { ...state.ui, notification: action.payload } };
    case 'CLEAR_NOTIFICATION':
      return { ...state, ui: { ...state.ui, notification: null } };
    default:
      return state;
  }
}

// ── Context & Provider ─────────────────────────────────────────────────────────
export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
