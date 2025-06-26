import { Category } from "@/types/category";
import { API } from "./apiConfig";

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(API.categories.list, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const categories = Array.isArray(data) 
      ? data 
      : (data.results || []);
    
    return categories.map((category: any) => ({
      id: category.id,
      name: category.name,
      imageUrl: category.image_url || category.imageUrl || null,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getCategoryData(id: string): Promise<Category | null> {
  try {
    const url = typeof API.categories.detail === 'function' 
      ? API.categories.detail(id)
      : `${API.categories.detail}/${id}`;

    const res = await fetch(url, { 
      next: { revalidate: 60 } 
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Ошибка загрузки данных категории ${id}:`, error);
    return null;
  }
}