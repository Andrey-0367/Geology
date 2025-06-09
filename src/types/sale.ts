export interface SaleItem {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  oldPrice: number;
  newPrice: number;
  slug: string; 
}

export interface SaleDetails extends SaleItem {
  imageUrls: string[];
}