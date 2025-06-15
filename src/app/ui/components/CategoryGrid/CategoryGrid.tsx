import React from 'react';
import styles from './CategoryGrid.module.scss';
import { Category } from '@/types/category';
import Link from 'next/link';
import CategoryCard from '../CategoryCard/CategoryCard';

type CategoryGridProps = {
  categories: Category[];
};

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  return (
    <div className={styles.grid}>
      {categories.map(category => (
        <Link 
          key={category.id} 
          href={`/shop/category/${category.id}`}
          className={styles.cardLink}
          passHref
        >
          <CategoryCard category={category} />
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;