/**
 * OPTIMIZED VERSION — split contexts.
 * Each component subscribes only to the slice it needs.
 * Changing cart state does NOT re-render UserInfo or ThemeSwitcher.
 */
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { UIProvider, useUIState } from './context/UIContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import Notification from './components/Notification';

function ThemedApp() {
  const { theme } = useUIState();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-layout">
      <Header mode="optimized" />
      <ProductList mode="optimized" />
      <CartSidebar mode="optimized" />
      <Notification mode="optimized" />
    </div>
  );
}

export default function AppOptimized() {
  return (
    <UserProvider>
      <UIProvider>
        <CartProvider>
          <ThemedApp />
        </CartProvider>
      </UIProvider>
    </UserProvider>
  );
}
