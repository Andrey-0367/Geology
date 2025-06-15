import { Category } from "./category";

export type ProductImage = {
  id: string; 
  image_url: string;
  is_svg: boolean;
  is_main: boolean;
  order: number;
  product: string;
};

export type Product = {
  id: string;
  main_image: string | null;
  images: ProductImage[];
  name: string;
  size: string;
  description: string;
  quantity: number;
  brand: string;
  thread_connection: string;
  thread_connection_2: string | null;
  armament: string;
  seal: string;
  iadc: string;
  category: Category; 
  price: number | null;
};