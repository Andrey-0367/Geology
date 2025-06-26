export type Category = {
  id: string;
  name: string;
  image_url: string; 
};

export type CategoryCardProps = {
  category: Category;
  onClick?: () => void;
};