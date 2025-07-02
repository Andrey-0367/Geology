import { fetchCategories, getCategoryData } from "@/api/categories";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import { getCategoryProducts } from "@/api/products";
import CatalogMenu from "@/app/ui/components/CatalogMenu/CatalogMenu";
import ShopLayout from "@/app/ui/components/ShopLayout/ShopLayout";
import ProductFilters from "@/app/ui/components/ProductFilters/ProductFilters";
import CategoryProducts from "@/app/ui/components/CategoryProducts/CategoryProducts";

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
    
    const [category, products, categories] = await Promise.all([
      getCategoryData(categoryId),
      getCategoryProducts(categoryId),
      fetchCategories()
    ]);

    if (!category) return notFound();

    const subCategories = categories.filter(c => c.parent === category.id);
    
    return (
      <div className={styles.container}>
        <ShopLayout 
          catalogMenu={<CatalogMenu categories={subCategories.length > 0 ? subCategories : categories} />}
          filtersMenu={<ProductFilters products={products || []} />}
        >
          <div className={styles.productsSection}>
            <h1 className={styles.categoryTitle}>{category.name}</h1>
            <CategoryProducts 
              products={products || []} 
              currentCategory={category}  
            />
          </div>
        </ShopLayout>
      </div>
    );
  } catch (error) {
    console.error("Error loading shop:", error);
    return notFound();
  }
}