/**
 * NAIVE VERSION — single AppContext wraps everything.
 * Every component re-renders on any state change.
 */
import { useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import Notification from './components/Notification';

function ThemedApp() {
  const { state } = useAppContext();
  const theme = state.ui.theme;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-layout">
      <Header mode="naive" />
      <ProductList mode="naive" />
      <CartSidebar mode="naive" />
      <Notification mode="naive" />
    </div>
  );
}

export default function AppNaive() {
  return (
    <AppProvider>
      <ThemedApp />
    </AppProvider>
  );
}
