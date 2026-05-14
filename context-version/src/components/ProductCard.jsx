import { useState, useCallback } from 'react';
import RenderCounter from './RenderCounter';
import { useAppContext } from '../context/AppContext';
import { useCartDispatch } from '../context/CartContext';
import { useUIDispatch } from '../context/UIContext';

function ProductCardNaive({ product }) {
  const [added, setAdded] = useState(false);
  const { dispatch } = useAppContext();

  const handleAdd = useCallback(() => {
    dispatch({ type: 'ADD_TO_CART', payload: { product } });
    dispatch({ type: 'SHOW_NOTIFICATION', payload: { message: `${product.name} added to cart!`, type: 'success' } });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }, [product, dispatch]);

  return (
    <article className="product-card">
      <div className="product-emoji" aria-hidden="true">{product.emoji}</div>
      <div className="product-name">{product.name} <RenderCounter /></div>
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

function ProductCardOptimized({ product }) {
  const [added, setAdded] = useState(false);
  const cartDispatch = useCartDispatch();
  const uiDispatch = useUIDispatch();

  const handleAdd = useCallback(() => {
    cartDispatch({ type: 'ADD_TO_CART', payload: { product } });
    uiDispatch({ type: 'SHOW_NOTIFICATION', payload: { message: `${product.name} added to cart!`, type: 'success' } });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }, [product, cartDispatch, uiDispatch]);

  return (
    <article className="product-card">
      <div className="product-emoji" aria-hidden="true">{product.emoji}</div>
      <div className="product-name">{product.name} <RenderCounter /></div>
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

export default function ProductCard({ product, mode = 'optimized' }) {
  return mode === 'naive'
    ? <ProductCardNaive product={product} />
    : <ProductCardOptimized product={product} />;
}
