import { fetchCategories } from '@/api/categories';
import { getCategoryProducts, getProductById } from '@/api/products';
import ProductDetail from '@/app/ui/components/ProductDetail/ProductDetail';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const categories = await fetchCategories();
  const allParams = [];
  
  for (const category of categories) {
    const categoryId = String(category.id);
    const products = await getCategoryProducts(categoryId);
    
    for (const product of products) {
      const productId = String(product.id);
      
      allParams.push({
        categoryId, 
        productId,   
      });
    }
  }
  
  return allParams;
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ productId: string }>; 
}) {
   try {
     const { productId } = await params;
  const product = await getProductById(productId);
  
  if (!product) {
    return notFound();
  }

  return <ProductDetail product={product} />;
  }catch (error) {
    console.error("Error loading shop:", error);
    return notFound();
  }
}


