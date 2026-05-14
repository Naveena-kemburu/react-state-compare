import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Single Zustand store for the entire application.
 * Components subscribe via selectors — only re-render when their selected slice changes.
 */
const useAppStore = create(
  devtools(
    (set, get) => ({
      // ── State ──────────────────────────────────────────────────────────────
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

      // ── Cart Actions ───────────────────────────────────────────────────────
      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.items.find((i) => i.productId === product.id);
          const items = existing
            ? state.cart.items.map((i) =>
                i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
              )
            : [
                ...state.cart.items,
                { productId: product.id, name: product.name, quantity: 1, price: product.price },
              ];
          return { cart: { ...state.cart, items } };
        }, false, 'addToCart'),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: { ...state.cart, items: state.cart.items.filter((i) => i.productId !== productId) },
        }), false, 'removeFromCart'),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              cart: { ...state.cart, items: state.cart.items.filter((i) => i.productId !== productId) },
            };
          }
          return {
            cart: {
              ...state.cart,
              items: state.cart.items.map((i) =>
                i.productId === productId ? { ...i, quantity } : i
              ),
            },
          };
        }, false, 'updateQuantity'),

      toggleCart: () =>
        set((state) => ({ cart: { ...state.cart, isOpen: !state.cart.isOpen } }), false, 'toggleCart'),

      // ── UI Actions ─────────────────────────────────────────────────────────
      setTheme: (theme) =>
        set((state) => ({ ui: { ...state.ui, theme } }), false, 'setTheme'),

      showNotification: (message, type = 'success') =>
        set((state) => ({ ui: { ...state.ui, notification: { message, type } } }), false, 'showNotification'),

      clearNotification: () =>
        set((state) => ({ ui: { ...state.ui, notification: null } }), false, 'clearNotification'),
    }),
    { name: 'ShopBench-Zustand' }
  )
);

export default useAppStore;
