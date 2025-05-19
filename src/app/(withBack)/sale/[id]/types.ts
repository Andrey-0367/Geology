export interface SaleDetails {
  id: number;
  title: string;
  imageUrls: string[];
  description: string;
  oldPrice: number;
  newPrice: number;
  specs?: {
    display?: string;
    cpu?: string;
    ram?: string;
    storage?: string;
  };
  discount?: number;
  formattedOldPrice?: string;
  formattedNewPrice?: string;
}