import React from 'react';
import styles from './ProductList.module.scss';
import ProductItem from '../ProductItem/ProductItem';
import { Product } from '@/types/products';
import { Category } from '@/types/category';
import ProductCard from '../ProductCard/ProductCard';

const getProductWord = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'товаров';
  if (lastDigit === 1) return 'товар';
  if (lastDigit >= 2 && lastDigit <= 4) return 'товара';
  return 'товаров';
};

type ProductListProps = {
  category: Category;
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ category, products }) => {
  const productList = products || [];
  const productCount = productList.length;
  const productWord = getProductWord(productCount); 

  return (
    <div className={styles.productList}>
      <div className={styles.categoryHeader}>
        <div className={styles.categoryInfo}>
          <div className={styles.productCount}>
            {productCount} {productWord}
          </div>
        </div>
      </div>
      
      <div className={styles.desktopView}>
        <table className={styles.productsTable}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Фото</th><th>Товар</th><th>Шт</th><th>Цена</th><th></th>
            </tr>
          </thead>
          <tbody className={styles.productsContainer}>
            {productList.length > 0 ? (
              productList.map(product => (
                <ProductItem 
                  key={product.id} 
                  product={product} 
                  category={category}
                />
              ))
            ) : (
              <tr><td colSpan={5} className={styles.emptyMessage}>Нет товаров в этой категории</td></tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className={styles.mobileView}>
        {productList.length > 0 ? (
          productList.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              category={category}
            />
          ))
        ) : (
          <div className={styles.emptyMessage}>Нет товаров в этой категории</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;