import RenderCounter from './RenderCounter';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';

export default function ProductList() {
  return (
    <main className="main-content">
      <h1 className="page-title">
        Products
        <RenderCounter />
      </h1>
      <div className="product-grid">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
