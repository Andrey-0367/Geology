import { API } from "./apiConfig";

export const getProductsByCategory = async (categoryId: string) => {
  if (!categoryId) {
    throw new Error('Category ID is required');
  }

  try {
    const endpoint = API.products.byCategory(categoryId);
    const res = await fetch(endpoint);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    throw error;
  }
};