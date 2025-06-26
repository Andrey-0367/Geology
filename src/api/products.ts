import { Product } from "@/types/products";
import { API } from "./apiConfig";

export async function getCategoryProducts(categoryId: string): Promise<Product[]> {
  try {
    const url = typeof API.products.byCategory === 'function' 
      ? API.products.byCategory(categoryId)
      : `${API.products.byCategory}/${categoryId}`;

    const res = await fetch(url, { 
      next: { revalidate: 60 } 
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const data = await res.json(); 

    if (Array.isArray(data)) {
      return data; 
    } else if (data.results && Array.isArray(data.results)) {
      return data.results; 
    } else {
      return []; 
    }
  } catch (error) {
    console.error('Error fetching category products:', error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
     const url = typeof API.products.detail === 'function' 
      ? API.products.detail(id)
      : `${API.products.detail}/${id}`;

    const res = await fetch(url, { 
      next: { revalidate: 60 } 
    });


    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }

    const product: Product = await res.json();
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}