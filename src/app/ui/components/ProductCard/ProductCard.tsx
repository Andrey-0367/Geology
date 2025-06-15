import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '@/types/products';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const mainImage = product.images.find(img => img.is_main) || product.images[0];
  
  const fullName = [
    product.name,
    product.size,
    product.brand
  ].filter(Boolean).join(' ');

  const formatPrice = (price: number | null) => {
    if (price === null) return "Цена по запросу";
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price) + " р.";
  };

  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Товар добавлен в корзину:", product.id);
    // Логика добавления в корзину
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.cardImageContainer}>
        {mainImage ? (
          <img 
            src={mainImage.image_url} 
            alt={product.name} 
            className={styles.cardImage}
          />
        ) : (
          <div className={styles.imagePlaceholder}>Нет фото</div>
        )}
      </div>
      
      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{fullName}</h3>
        
        <div className={styles.cardDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Цена</span>
            <span className={styles.cardPrice}>{formatPrice(product.price)}</span>
          </div>
        </div>
        
        <div className={styles.cardFooter}>
          <div className={styles.quantityBadge}>
            {product.quantity} шт
          </div>
          <button 
            className={styles.buyButton}
            onClick={handleBuy}
          >
            Купить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;