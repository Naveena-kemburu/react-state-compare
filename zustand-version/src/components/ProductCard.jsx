import { useState, useCallback } from 'react';
import RenderCounter from './RenderCounter';
import useAppStore from '../store/useAppStore';

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);

  // Subscribe only to the actions we need — stable references, no re-renders from state
  const addToCart = useAppStore((s) => s.addToCart);
  const showNotification = useAppStore((s) => s.showNotification);

  const handleAdd = useCallback(() => {
    addToCart(product);
    showNotification(`${product.name} added to cart!`, 'success');
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }, [product, addToCart, showNotification]);

  return (
    <article className="product-card">
      <div className="product-emoji" aria-hidden="true">{product.emoji}</div>
      <div className="product-name">
        {product.name}
        <RenderCounter />
      </div>
      <div className="product-price">${product.price.toFixed(2)}</div>
      <p className="product-desc">{product.description}</p>
      <button
        className={`add-to-cart-btn ${added ? 'added' : ''}`}
        onClick={handleAdd}
        aria-label={`Add ${product.name} to cart`}
      >
        {added ? '✓ Added' : '+ Add to Cart'}
      </button>
    </article>
  );
}
