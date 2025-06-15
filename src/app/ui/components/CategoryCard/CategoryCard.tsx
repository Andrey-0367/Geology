import React from 'react';
import styles from './CategoryCard.module.scss';
import { CategoryCardProps } from '@/types/category';


const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category,
  onClick 
}) => {
  return (
    <div 
      className={styles.card} 
      onClick={onClick} 
      role={onClick ? "button" : undefined} 
      tabIndex={onClick ? 0 : undefined}
    >
      <img 
        src={category.imageUrl} 
        alt={category.name} 
        className={styles.image}
      />
      <div className={styles.name}>{category.name}</div>
    </div>
  );
};
export default CategoryCard;