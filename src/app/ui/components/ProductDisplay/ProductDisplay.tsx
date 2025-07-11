"use client";

import React, { useMemo, Suspense } from 'react';
import styles from './ProductDisplay.module.scss';
import { Product } from '@/types/products';
import { Category } from '@/types/category';
import ProductTable from '../ProductTable/ProductTable';
import ProductCard from '../ProductCard/ProductCard';
import { useSearchParams } from 'next/navigation';
import Loading from '@/app/loading'; // Импортируем компонент загрузки

// Функция для нормализации значений (перенесена из ProductFilters)
const normalizeValue = (value: string) => {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ') 
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''); 
};

const getProductWord = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'товаров';
  if (lastDigit === 1) return 'товар';
  if (lastDigit >= 2 && lastDigit <= 4) return 'товара';
  return 'товаров';
};

type ProductDisplayProps = {
  category: Category;
  products: Product[];
};

// Внутренний компонент, который использует useSearchParams
const ProductDisplayContent = ({ category, products }: ProductDisplayProps) => {
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

  const productCount = filteredProducts.length;
  const productWord = getProductWord(productCount); 

  return (
    <div className={styles.productDisplay}>
      <div className={styles.categoryHeader}>
        <div className={styles.categoryInfo}>
          <div className={styles.productCount}>
            {productCount} {productWord}
          </div>
        </div>
      </div>
      
      {/* Десктопный вид - таблица */}
      <div className={styles.desktopView}>
        <ProductTable 
          products={filteredProducts} 
          category={category} 
        />
      </div>
      
      {/* Мобильный вид - сетка карточек */}
      <div className={styles.mobileView}>
        <div className={styles.productsGrid}>
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              category={category}
            />
          ))}
        </div>
      </div>
      
      {filteredProducts.length === 0 && (
        <div className={styles.noProducts}>
          <h3>Товары не найдены</h3>
          <p>Попробуйте изменить параметры фильтрации</p>
        </div>
      )}
    </div>
  );
};

// Основной компонент с Suspense boundary
const ProductDisplay: React.FC<ProductDisplayProps> = (props) => {
  return (
    <Suspense fallback={<Loading />}>
      <ProductDisplayContent {...props} />
    </Suspense>
  );
};

export default ProductDisplay;