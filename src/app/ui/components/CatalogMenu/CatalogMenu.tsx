import React from 'react';
import Link from 'next/link';
import styles from './CatalogMenu.module.scss';
import { Category } from '@/types/category';

interface CatalogMenuProps {
  categories: Category[];
}

export default function CatalogMenu({ categories }: CatalogMenuProps) {
  return (
    <ul className={styles.menuList}>
      {categories.map(category => (
        <li key={category.id} className={styles.menuItem}>
          <Link 
            href={`/shop/category/${category.id}`} 
            className={styles.menuLink}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}