import { notFound } from 'next/navigation';
import styles from './page.module.scss';
import { Title } from '@/components/Title/Title';
import { getCategoryData } from '@/api/categories';


export default async function CategoryPage({
  params,
}: {
  params: { id: string };
  
}) {
   try {
 
     const { id } = await params;
     const numericId = Number(id);
     
     if (isNaN(numericId)) return notFound();
 
      const member = await  getCategoryData(id);
     if (!member) return notFound();
  return (
    <div className={styles.container}>
      <Title tag="h1">category.name</Title>
    
    </div>
  );
   }
  