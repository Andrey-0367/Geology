"use client";

import React, { useState } from 'react';
import styles from './ProductDetail.module.scss';
import { Product } from '@/types/products';
import Link from 'next/link';
import Tabs from '@/components/Tabs/Tabs';

const ProductDetail = ({ product }: { product: Product }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  
  const formatPrice = (price: number | null) => {
    if (price === null) return "Цена по запросу";
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price) + " р.";
  };

  const handleBuy = () => console.log("Buy product:", product.id);
  const handleQuickOrder = () => console.log("Quick order:", product.id);
  
  const tabs = [
    {
      id: 'description',
      title: 'Описание',
      content: product.description ? (
        <div className={styles.tabContent}>
          {product.description}
        </div>
      ) : (
        <div className={styles.noContent}>Нет описания</div>
      )
    },
    {
      id: 'specs',
      title: 'Характеристики',
      content: (
        <div className={styles.tabContent}>
          <table className={styles.specsTable}>
            <tbody>
              {product.size && <tr><td>Размер</td><td>{product.size}</td></tr>}
              {product.brand && <tr><td>Марка</td><td>{product.brand}</td></tr>}
              {product.thread_connection && (
                <tr><td>Присоединительная резьба</td><td>{product.thread_connection}</td></tr>
              )}
              {product.thread_connection_2 && (
                <tr><td>Присоединительная резьба 2</td><td>{product.thread_connection_2}</td></tr>
              )}
              {product.armament && (
                <tr><td>Вооружение</td><td>{product.armament}</td></tr>
              )}
              {product.seal && (
                <tr><td>Уплотнение</td><td>{product.seal}</td></tr>
              )}
              {product.iadc && (
                <tr><td>IADC</td><td>{product.iadc}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link href="/shop">Каталог</Link>
        {' > '}
        <Link href={`/shop/category/${product.category.id}`}>
          {product.category.name}
        </Link>
        {' > '}
        <span>{product.name}</span>
      </div>

      <div className={styles.productHeader}>
        <h1 className={styles.productTitle}>
          {product.name} {product.size}
        </h1>
        {product.brand && <div className={styles.brand}>Марка: {product.brand}</div>}
      </div>

      <div className={styles.productContent}>
        <div className={styles.gallery}>
          <div className={styles.mainImageContainer}>
            {product.images && product.images.length > 0 ? (
              <img 
                src={product.images[mainImageIndex].image_url} 
                alt={product.name} 
                className={styles.mainImage}
              />
            ) : (
              <div className={styles.imagePlaceholder}>Нет фото</div>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className={styles.thumbnails}>
              {product.images.map((image, index) => (
                <div 
                  key={image.id}
                  className={`${styles.thumbnail} ${index === mainImageIndex ? styles.active : ''}`}
                  onClick={() => setMainImageIndex(index)}
                >
                  <img 
                    src={image.image_url} 
                    alt={`Превью ${index + 1}`} 
                    className={styles.thumbnailImage}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.productInfo}>
          <div className={styles.priceSection}>
            <div className={styles.price}>{formatPrice(product.price)}</div>
            <div className={styles.availability}>
              {product.quantity > 0 ? (
                <span className={styles.inStock}>В наличии: {product.quantity} шт</span>
              ) : (
                <span className={styles.outOfStock}>Нет в наличии</span>
              )}
            </div>
            <div className={styles.actions}>
              <button 
                className={styles.buyButton}
                onClick={handleBuy}
                disabled={product.quantity <= 0}
              >
                Купить
              </button>
              <button 
                className={styles.quickOrderButton}
                onClick={handleQuickOrder}
              >
                Быстрый заказ
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tabsSection}>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export default ProductDetail;