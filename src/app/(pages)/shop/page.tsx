import CatalogSection from "@/app/ui/components/CatalogSection/CatalogSection";
import styles from "./page.module.scss";
import { fetchCategories } from "@/api/categories";
import CategoryGrid from "@/app/ui/components/CategoryGrid/CategoryGrid";
import ShopLayout from "@/app/ui/components/ShopLayout/ShopLayout";
import CatalogMenu from "@/app/ui/components/CatalogMenu/CatalogMenu";

export default async function ShopPage() {
  const categories = await fetchCategories();

  return (
    <div className={styles.container}>
      <ShopLayout 
        catalogMenu={<CatalogMenu categories={categories} />}
      >
        <>
          <CatalogSection />
          <div className={styles.categoryGridContainer}>
            <CategoryGrid categories={categories} />
          </div>
        </>
      </ShopLayout>
    </div>
  );
}