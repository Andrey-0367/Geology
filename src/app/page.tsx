import React from 'react';
import styles from './page.module.scss';
import { fetchCategories } from '@/api/categories';
import CategoryGrid from '@/app/ui/components/CategoryGrid/CategoryGrid';
import { Title } from '@/components/Title/Title';

export default async function Home() {
  const categories = await fetchCategories();
  
  // Фильтруем корневые категории (без родителя) и берем первые 4
  const rootCategories = categories
    .filter(category => !category.parent)
    .slice(0, 5);

  return (
    <main className={styles.main}>
      {/* Герой-секция */}
      <section className={styles.hero}>
        <Title tag="h1">Магазин бурового оборудования</Title>
        <p className={styles.subtitle}>Профессиональное оборудование для бурения и ремонта скважин</p>
      </section>

      {/* Секция с категориями */}
      <section className={styles.categoriesSection}>
        <Title tag="h2">Популярные категории</Title>
        <CategoryGrid categories={rootCategories} />
      </section>
    </main>
  );
}