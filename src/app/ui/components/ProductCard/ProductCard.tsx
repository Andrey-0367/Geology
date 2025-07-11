"use client"; 

import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '@/types/products';
import { Category } from '@/types/category';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext'; 

type ProductCardProps = {
  product: Product;
  category: Category; 
};

const ProductCard: React.FC<ProductCardProps> = ({ product, category }) => {
  const { addToCart } = useCart(); 
  const mainImage = product.images.find(img => img.is_main) || product.images[0];
  
  const fullName = [
    product.name,
    product.size,
    product.brand
  ].filter(Boolean).join(' ');

  const productPath = `/shop/category/${category.id}/product/${product.id}`;

  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
   
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price || 0, 
      quantity: 1,
      imageUrl: mainImage?.image_url || ''
    });
    
    console.log("Товар добавлен в корзину:", product.id);
  };

  return (
    <Link href={productPath} className={styles.cardLink}>
      <div className={styles.productCard}>
        <div className={styles.cardImageContainer}>
          {mainImage?.image_url ? (
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
              <span className={styles.cardPrice}>
                {product.price 
                  ? new Intl.NumberFormat('ru-RU').format(product.price) + " ₽" 
                  : "Цена по запросу"}
              </span>
            </div>
          </div>
          
          <div className={styles.cardFooter}>
            <div className={styles.quantityBadge}>
              {product.quantity} шт
            </div>
            <button 
              className={styles.buyButton}
              onClick={handleBuy}
              disabled={!product.price} 
            >
              Купить
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;