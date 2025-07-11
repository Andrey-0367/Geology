'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styles from './CardSale.module.scss';
import { SaleItem } from '@/types/sale';

const CardSaleUI: React.FC<SaleItem> = ({
  slug,
  title,
  imageUrl,
  oldPrice,
  newPrice,
}) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [imgSrc, setImgSrc] = useState(imageUrl);
  
  const discountPercentage = Math.round(
    ((oldPrice - newPrice) / oldPrice) * 100
  );

  const handleClick = () => {
    router.push(`/sale/${slug}`);
  };

  // Обработчик ошибок загрузки изображения
  const handleImageError = () => {
    console.error(`Failed to load image: ${imageUrl}`);
    setImageError(true);
    
    // Пробуем загрузить без параметров кеширования
    if (imgSrc.includes('?')) {
      setImgSrc(imageUrl.split('?')[0]);
    } else {
      // Используем заглушку
      setImgSrc(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/skoro.jpg`);
    }
  };

  return (
    <div 
      className={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className={styles.imageContainer}>
        {imageError ? (
          <div className={styles.imagePlaceholder}>
            {/* Заглушка при ошибке */}
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/skoro.jpg`}
              alt="Изображение недоступно"
              className={styles.productImage}
            />
          </div>
        ) : (
          <img
            src={imgSrc}
            alt={title}
            className={styles.productImage}
            onError={handleImageError}
            loading="lazy"
          />
        )}
        
        <div className={styles.discountBadge}>
          -{discountPercentage}%
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        
        <div className={styles.prices}>
          <span className={styles.oldPrice}>
            {oldPrice.toFixed(2)} ₽
          </span>
          <span className={styles.newPrice}>
            {newPrice.toFixed(2)} ₽
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardSaleUI;