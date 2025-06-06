"use client";

import { Product } from '@/types/products';
import Link from 'next/link';


export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="product-card"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">{product.price} руб.</p>
        <p className="category">{product.category.name}</p>
      </div>
    </Link>
  );
}