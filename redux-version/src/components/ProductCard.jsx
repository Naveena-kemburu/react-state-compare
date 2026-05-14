import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import RenderCounter from './RenderCounter';
import { addToCart } from '../store/cartSlice';
import { showNotification } from '../store/uiSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const handleAdd = useCallback(() => {
    dispatch(addToCart(product));
    dispatch(showNotification({ message: `${product.name} added to cart!`, type: 'success' }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }, [dispatch, product]);

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
