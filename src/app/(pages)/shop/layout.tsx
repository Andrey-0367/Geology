

import React from 'react';
import styles from './layout.module.scss';
import CatalogMenu from '@/app/ui/components/CatalogMenu/CatalogMenu';
import { fetchCategories } from '@/api/categories';

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await fetchCategories();
  
  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.sidebar}>
        <CatalogMenu categories={categories} />
      </aside>
      
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}