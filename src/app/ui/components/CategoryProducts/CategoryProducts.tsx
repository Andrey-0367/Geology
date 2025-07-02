"use client";

import { useSearchParams } from "next/navigation";
import ProductCard from "@/app/ui/components/ProductCard/ProductCard";
import styles from "./CategoryProducts.module.scss";
import { useMemo } from "react";
import { Product } from "@/types/products";
import { Category } from "@/types/category";

// Функция для нормализации значений
const normalizeValue = (value: string) => {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ") // Заменяем множественные пробелы на один
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""); // Удаляем спецсимволы
};

interface CategoryProductsProps {
  products: Product[];
  currentCategory: Category; 
}

export default function CategoryProducts({ 
  products,
  currentCategory 
}: CategoryProductsProps) {
  const searchParams = useSearchParams();

  // Фильтруем продукты по параметрам URL
  const filteredProducts = useMemo(() => {
    if (!searchParams || searchParams.toString() === "") {
      return products;
    }

    return products.filter((product) => {
      for (const [key, filterValue] of searchParams.entries()) {
        const productValue = product[key as keyof Product];
        if (productValue === undefined || productValue === null) return false;

        const normalizedProduct = normalizeValue(String(productValue));
        const normalizedFilter = normalizeValue(filterValue);

        if (normalizedProduct !== normalizedFilter) {
          return false;
        }
      }
      return true;
    });
  }, [products, searchParams]);

  if (filteredProducts.length === 0) {
    return (
      <div className={styles.noProducts}>
        <h3>Товары не найдены</h3>
        <p>Попробуйте изменить параметры фильтрации</p>
      </div>
    );
  }

  return (
    <div className={styles.productsGrid}>
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          category={currentCategory}
        />
      ))}
    </div>
  );
}
