// app/ui/components/ShopLayout/ShopLayout.tsx
import React from 'react';
import Link from 'next/link';
import styles from './ShopLayout.module.scss';

interface ShopLayoutProps {
  children: React.ReactNode;
  catalogMenu: React.ReactNode;
  filtersMenu?: React.ReactNode;
}

export default function ShopLayout({
  children,
  catalogMenu,
  filtersMenu,
}: ShopLayoutProps) {
  return (
    <div className={styles.container}>
  
      <aside className={styles.sidebar}>
       
          <div className={styles.menuButton}>МЕНЮ</div>
          <Link href="/shop" className={styles.catalogButton}>
            КАТАЛОГ
          </Link>
      
        
        {/* Список категорий */}
        <div className={styles.categoryList}>
          {catalogMenu}
        </div>
        
       
        <div className={styles.parametersSection}>
          {/* <div className={styles.parametersHeader}>ПАРАМЕТРЫ</div> */}
          {filtersMenu}
        </div>
      </aside>

      {/* Основной контент */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}