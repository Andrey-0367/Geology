import { notFound } from 'next/navigation';
import styles from './page.module.scss';
import { Title } from '@/components/Title/Title';


// Добавьте функцию получения данных
async function getCategoryData(id: string) {
  try {
    const response = await fetch(`https://api.example.com/categories/${id}`);
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error(`Ошибка загрузки категории ${id}:`, error);
    return null;
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const category = await getCategoryData(params.id);
  
  if (!category) {
    return notFound();
  }

  return (
    <div className={styles.container}>
      <Title tag="h1">{category.name}</Title>
    
    </div>
  );
}