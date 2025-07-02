'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './ProductFilters.module.scss';
import { useMemo } from 'react';
import { Product } from '@/types/products';

// Функция для нормализации значений
const normalizeValue = (value: string) => {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ') // Заменяем множественные пробелы на один
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''); // Удаляем спецсимволы
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

export default function ProductFilters({ products }: { products: Product[] }) {
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
    const newParams = new URLSearchParams();
    
    // Копируем текущие фильтры
    for (const [key, val] of Object.entries(currentFilters)) {
      newParams.set(key, val);
    }
    
    // Если фильтр уже применен - снимаем
    if (newParams.get(filterType) === value) {
      newParams.delete(filterType);
    } else {
      newParams.set(filterType, value);
    }
    
    // Очищаем URL от пустых параметров
    cleanUrlParams(newParams);
    
    // Формируем новый URL
    const newUrl = `${pathname}?${newParams.toString()}`;
    router.push(newUrl);
  };

  // Сброс всех фильтров
  const clearFilters = () => {
    router.push(pathname);
  };

  // Очистка пустых параметров
  const cleanUrlParams = (params: URLSearchParams) => {
    const keysToDelete: string[] = [];
    
    for (const [key, value] of params.entries()) {
      if (!value.trim()) {
        keysToDelete.push(key);
      }
    }
    
    keysToDelete.forEach(key => params.delete(key));
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
}