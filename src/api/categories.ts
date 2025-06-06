import { API } from "./apiConfig";

export const getCategoryData = async (categoryId: string) => {
  try {
    const res = await fetch(API.categories.detail(categoryId));
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error(`Error fetching category ${categoryId}:`, error);
    throw error;
  }
};