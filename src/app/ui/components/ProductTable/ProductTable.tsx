"use client";

import React from 'react';
import styles from './ProductTable.module.scss';
import { Product } from '@/types/products';
import { Category } from '@/types/category';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

interface ProductTableProps {
  products: Product[];
  category: Category;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, category }) => {
  const { addToCart } = useCart();

  // Измененный обработчик - возвращает функцию, а не принимает параметры напрямую
  const handleBuy = (product: Product) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const fullName = [
      product.name,
      product.size,
      product.brand
    ].filter(Boolean).join(' ');
    
    const mainImage = product.images.find(img => img.is_main) || product.images[0];
    
    addToCart({
      id: product.id,
      name: fullName,
      price: product.price || 0,
      quantity: 1,
      imageUrl: mainImage?.image_url
    });
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.photoHeader}>Фото</th>
            <th className={styles.nameHeader}>Товар</th>
            <th className={styles.quantityHeader}>Шт</th>
            <th className={styles.priceHeader}>Цена</th>
            <th className={styles.actionHeader}></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const mainImage = product.images.find(img => img.is_main) || product.images[0];
            const fullName = [
              product.name,
              product.size,
              product.brand
            ].filter(Boolean).join(' ');
            
            const productPath = `/shop/category/${category.id}/product/${product.id}`;
            
            return (
              <tr key={product.id} className={styles.productRow}>
                <td className={styles.photoCell}>
                  <Link href={productPath} className={styles.imageLink}>
                    {mainImage?.image_url ? (
                      <img 
                        src={mainImage.image_url} 
                        alt={product.name} 
                        className={styles.productImage}
                      />
                    ) : (
                      <div className={styles.imagePlaceholder}>Нет фото</div>
                    )}
                  </Link>
                </td>
                <td className={styles.nameCell}>
                  <Link href={productPath} className={styles.productLink}>
                    {fullName}
                  </Link>
                </td>
                <td className={styles.quantityCell}>
                  {product.quantity > 0 ? product.quantity : 'Под заказ'}
                </td>
                <td className={styles.priceCell}>
                  {product.price 
                    ? new Intl.NumberFormat('ru-RU').format(product.price) + " ₽" 
                    : "Цена по запросу"}
                </td>
                <td className={styles.actionCell}>
                  <button 
                    className={styles.buyButton}
                    onClick={handleBuy(product)} // Исправленный вызов
                    disabled={!product.price || product.quantity <= 0}
                  >
                    В корзину
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;