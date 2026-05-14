import { useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import Notification from './components/Notification';
import useAppStore from './store/useAppStore';

export default function App() {
  const theme = useAppStore((s) => s.ui.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-layout">
      <Header />
      <ProductList />
      <CartSidebar />
      <Notification />
    </div>
  );
}
