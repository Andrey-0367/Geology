import { SaleDetails, SaleItem } from "@/types/sale";
import { API } from "./apiConfig";

export async function getSale(): Promise<SaleItem[]> {
  try {
    const response = await fetch(API.saleItems.list, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return data.map((item: any) => {
      const mainImage = item.images?.find((img: any) => img.is_main) || item.images?.[0];
      
      return {
        id: item.id.toString(),
        title: item.title,
        imageUrl: mainImage?.image || `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/skoro.jpg`,
        description: item.description,
        oldPrice: parseFloat(item.old_price),
        newPrice: parseFloat(item.new_price),
        slug: item.slug
      };
    });
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
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    
    if (!data || typeof data !== 'object') {
      return null;
    }
    
    const allImages = data.images?.map((img: any) => img.image) || [];
    const mainImage = data.images?.find((img: any) => img.is_main) || data.images?.[0];
    const mainImageUrl = mainImage?.image || "";

    return {
      id: data.id.toString(),
      title: data.title,
      description: data.description,
      oldPrice: parseFloat(data.old_price),
      newPrice: parseFloat(data.new_price),
      slug: data.slug,
      imageUrl: mainImageUrl, 
      imageUrls: allImages 
    };
  } catch (error) {
    console.error(`Ошибка загрузки данных товара ${slug}:`, error);
    return null;
  }
}