import CatalogSection from "@/app/ui/components/CatalogSection/CatalogSection";
import styles from "./page.module.scss";
import { fetchCategories } from "@/api/categories";
import CategoryGrid from "@/app/ui/components/CategoryGrid/CategoryGrid";

export default async function ShopPage() {
  const categories = await fetchCategories();
  
  return (
    <div className={styles.container}>
      {/* Передаем пустой объект вместо undefined */}
      <CatalogSection />
      <CategoryGrid categories={categories} />
    </div>
  );
}