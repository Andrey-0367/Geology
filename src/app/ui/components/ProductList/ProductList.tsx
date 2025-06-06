"use client";

import { Product } from "@/types/products";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductList.module.scss";


export default function ProductList({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <div className={styles.empty}>Товары в этой категории отсутствуют</div>;
  }

  const categoryName = products[0]?.category?.name || "Категория";

  return (
    <div className={styles.container}>
      <h1 className={styles.categoryTitle}>{categoryName}</h1>
      
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}