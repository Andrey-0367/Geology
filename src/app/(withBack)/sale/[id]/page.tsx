import { notFound } from 'next/navigation';
import styles from "./page.module.scss";
import { mockSales } from './mock';
import { SaleDetailSection } from '@/app/ui/containers/SaleDetailSection/SaleDetailSection';
import { Title } from '@/components/Title/Title';

export interface SaleDetails {
  id: number;
  title: string;
  imageUrls: string[];
  description: string;
  oldPrice: number;
  newPrice: number;
}

async function getSaleDetails(id: number): Promise<SaleDetails | undefined> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockSales.find(sale => sale.id === id));
    }, 0);
  });
}


export async function generateStaticParams() {
  return mockSales.map(sale => ({
    id: sale.id.toString(),
  }));
}

export default async function SaleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const numericId = Number(id);
    
    const sale = await getSaleDetails(numericId);

    if (!sale) return notFound();

    return (
      <div className={styles.container}>
        <Title tag={'h1'}>{sale.title}</Title>
        
        <SaleDetailSection images={sale.imageUrls} />

        <div className={styles.priceContainer}>
          <span className={styles.oldPrice}>{sale.oldPrice.toFixed(2)} ₽</span>
          <span className={styles.newPrice}>{sale.newPrice.toFixed(2)} ₽</span>
        </div>

        <div className={styles.description}>
          <Title tag={'h3'}>Описание товара</Title>
          <p>{sale.description}</p>
        </div>
      </div>
    );
    
  } catch (error) {
    console.error('Error loading sale details:', error);
    return notFound();
  }
}