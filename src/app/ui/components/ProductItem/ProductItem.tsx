import React from 'react';
import styles from './ProductItem.module.scss';
import { Product } from '@/types/products';
import { Category } from '@/types/category';
import Link from 'next/link';

type ProductItemProps = {
  product: Product;
  category: Category; // Добавляем категорию в пропсы
};

const ProductItem: React.FC<ProductItemProps> = ({ product, category }) => {
  // Получаем основное изображение или первое доступное
  const mainImage = product.images.find(img => img.is_main) || product.images[0];
  
  const fullName = [
    product.name,
    product.size,
    product.brand
  ]
    .filter(Boolean) 
    .join(' ');      

  const formatPrice = (price: number | null) => {
    if (price === null) return "Цена по запросу";
    
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price) + " р.";
  };

  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Товар добавлен в корзину:", product.id);
    // Здесь будет логика добавления в корзину
  };

  // Формируем новый путь с учетом категории
  const productPath = `/shop/category/${category.id}/product/${product.id}`;

  return (
    <tr className={styles.productRow}>
      <td className={styles.imageCell}>
        <Link href={productPath} className={styles.imageLink}>
          {mainImage ? (
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
      <td className={styles.quantityCell}>{product.quantity}</td>
      <td className={styles.priceCell}>
        {formatPrice(product.price)}
      </td>
      <td className={styles.actionCell}>
        <button 
          className={styles.buyButton}
          onClick={handleBuy}
        >
          Купить
        </button>
      </td>
    </tr>
  );
};

export default ProductItem;