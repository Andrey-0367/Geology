'use client';

import { Suspense, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './ProductFilters.module.scss';
import { Product } from '@/types/products';
import Loading from '@/app/loading';

// Функция для нормализации значений
const normalizeValue = (value: string) => {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
};

// Функция для получения уникальных значений параметра
const getUniqueValues = (products: Product[], property: keyof Product) => {
  const valuesMap = new Map<string, string>();
  
  products.forEach(p => {
    const value = p[property];
    if (value) {
      const normalized = normalizeValue(String(value));
      if (normalized) {
        valuesMap.set(normalized, String(value));
      }
    }
  });
  
  return Array.from(valuesMap.values());
};

// Внутренний компонент, использующий хуки навигации
const ProductFiltersContent = ({ products }: { products: Product[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Получаем текущие фильтры из URL
  const currentFilters = useMemo(() => {
    const filters: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
      filters[key] = value;
    }
    return filters;
  }, [searchParams]);

  // Формируем группы фильтров
  const filterGroups = useMemo(() => {
    const groups: Record<string, string[]> = {};
    
    const filterProperties: (keyof Product)[] = [
      'brand', 
      'size', 
      'thread_connection',
      'armament',
      'seal',
      'iadc'
    ];
    
    filterProperties.forEach(prop => {
      const values = getUniqueValues(products, prop);
      if (values.length > 0) {
        groups[prop] = values;
      }
    });
    
    return groups;
  }, [products]);

  // Обновление URL при изменении фильтра
  const handleFilterChange = (filterType: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    // Если фильтр уже применен - снимаем
    if (newParams.get(filterType) === value) {
      newParams.delete(filterType);
    } else {
      newParams.set(filterType, value);
    }
    
    // Формируем новый URL
    const newUrl = `${pathname}?${newParams.toString()}`;
    router.push(newUrl);
  };

  // Сброс всех фильтров
  const clearFilters = () => {
    router.push(pathname);
  };

  if (Object.keys(filterGroups).length === 0) return null;

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersHeader}>
        <h2>Параметры</h2>
        {Object.keys(currentFilters).length > 0 && (
          <button 
            className={styles.clearButton}
            onClick={clearFilters}
          >
            Сбросить фильтры
          </button>
        )}
      </div>
      
      {Object.entries(filterGroups).map(([filterType, values]) => (
        <div key={filterType} className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>
            {filterType === 'brand' && 'Бренд'}
            {filterType === 'size' && 'Размер'}
            {filterType === 'thread_connection' && 'Тип резьбы'}
            {filterType === 'armament' && 'Вооружение'}
            {filterType === 'seal' && 'Уплотнение'}
            {filterType === 'iadc' && 'IADC код'}
          </h3>
          <div className={styles.filterOptions}>
            {values.map(value => (
              <div
                key={value}
                className={`${styles.filterOption} ${
                  currentFilters[filterType] === value ? styles.active : ''
                }`}
                onClick={() => handleFilterChange(filterType, value)}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Основной компонент с Suspense boundary
const ProductFilters = ({ products }: { products: Product[] }) => {
  return (
    <Suspense fallback={<Loading />}>
      <ProductFiltersContent products={products} />
    </Suspense>
  );
};

export default ProductFilters;