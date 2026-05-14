import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import Notification from './components/Notification';
import { selectTheme } from './store/uiSlice';

export default function App() {
  const theme = useSelector(selectTheme);

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
