import { fetchCategories, getCategoryData } from "@/api/categories";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import { getCategoryProducts } from "@/api/products";
import CatalogSection from "@/app/ui/components/CatalogSection/CatalogSection";

export async function generateStaticParams() {
  const categories = await fetchCategories();
  
  return categories.map(category => ({
    categoryId: category.id.toString()
  }));
}

export default async function CategoryDetails({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  try {

    const { categoryId } = await params;
    const [category, products] = await Promise.all([
    getCategoryData(categoryId),
    getCategoryProducts(categoryId)
  ]);

   if (!category) return notFound();

  return (
   <div className={styles.container}>
      <CatalogSection 
        activeCategory={category}
         products={products || []}
      />
    </div>
  );
}catch (error) {
    console.error("Error loading shop:", error);
    return notFound();
  }
}
