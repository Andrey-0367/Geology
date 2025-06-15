import { getProductById } from '@/api/products';
import ProductDetail from '@/app/ui/components/ProductDetail/ProductDetail';
import { notFound } from 'next/navigation';

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


