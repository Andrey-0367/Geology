import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import { SaleDetailSection } from "@/app/ui/containers/SaleDetailSection/SaleDetailSection";
import { Title } from "@/components/Title/Title";
import { getSale, getSaleDetails } from "@/api/sale";

export async function generateStaticParams() {
  const sales = await getSale();
 return sales.map((sale) => ({ slug: sale.slug })); 
}

export default async function SaleDetailPage({
  params,
}: {
   params: Promise<{ slug: string }>;
}) {
  try {
    const { slug: slug } = await params; 
    const sale = await getSaleDetails(slug);
   
    if (!sale) return notFound();
  

    return (
      <div className={styles.container}>
        <Title tag={"h1"}>{sale.title || "Без названия"}</Title>
        <SaleDetailSection imageUrls={sale.imageUrls || []} />
        <div className={styles.priceContainer}>
          <span className={styles.oldPrice}>
            {(sale.oldPrice ?? 0).toFixed(2)} ₽
          </span>
          <span className={styles.newPrice}>
            {(sale.newPrice ?? 0).toFixed(2)} ₽
          </span>
        </div>

        <div className={styles.description}>
          <Title tag={"h3"}>Описание товара</Title>
          <p>{sale.description || "Описание отсутствует"}</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading sale:", error);
    return notFound();
  }
}
