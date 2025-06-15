import { Category } from "./category";
import { Product } from "./products";

export type CatalogSectionProps = {
  activeCategory?: Category | null;
  products?: Product[]; 
};
