'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
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
  const discountPercentage = Math.round(
    ((oldPrice - newPrice) / oldPrice) * 100
  );

  const handleClick = () => {
   router.push(`/sale/${slug}`);
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
        <img
          src={imageUrl}
          alt={title}
          className={styles.productImage}
        />
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