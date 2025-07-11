import { SaleDetails, SaleItem } from "@/types/sale";
import { API } from "./apiConfig";

export async function getSale(): Promise<SaleItem[]> {
  try {
    const response = await fetch(API.saleItems.list, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 }
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const { results } = await response.json();
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || '';

    return (results || []).map((item: any) => ({
      id: item.id.toString(),
      title: item.title,
      imageUrl: item.main_image 
        ? baseUrl + item.main_image 
        : `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/skoro.jpg`,
      description: item.description,
      oldPrice: parseFloat(item.old_price),
      newPrice: parseFloat(item.new_price),
      slug: item.slug
    }));
  } catch (error) {
    console.error("Ошибка загрузки товаров:", error);
    return []; 
  }
}

export async function getSaleDetails(slug: string): Promise<SaleDetails | null> {
  try {
    const url = API.saleItems.detail(slug);
    const res = await fetch(url, { 
      headers: { Accept: "application/json" },
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) return null;
    
    const item = await res.json();
    
    // Получаем основное изображение напрямую из API
    const mainImage = item.main_image 
      ? item.main_image 
      : `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/skoro.jpg`;

    return {
      id: item.id.toString(),
      title: item.title,
      description: item.description,
      oldPrice: parseFloat(item.old_price),
      newPrice: parseFloat(item.new_price),
      slug: item.slug,
      imageUrl: mainImage,
      imageUrls: [] 
    };
  } catch (error) {
    console.error(`Ошибка загрузки данных товара ${slug}:`, error);
    return null;
  }
}