"use client";

import React, { useEffect, useRef } from 'react';
import styles from './CatalogSection.module.scss';
import { CatalogSectionProps } from '@/types/catalog';
import { useRouter } from 'next/navigation';
import ProductDisplay from '../ProductDisplay/ProductDisplay'; // Импортируем новый компонент

const CatalogSection: React.FC<CatalogSectionProps> = ({ 
  activeCategory, 
  products = []
}) => {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    return () => {
      if (sectionRef.current) {
        sectionRef.current = null;
      }
    };
  }, []);

  return (
    <div className={styles.section} ref={sectionRef}> 
      <h2 className={styles.sectionTitle}>
        {activeCategory ? activeCategory.name : 'Каталог товаров'}
      </h2>
      
      <div className={styles.container}>
        <div className={styles.contentColumn}>
          {activeCategory && (
            <ProductDisplay 
              category={activeCategory}
              products={products}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogSection;