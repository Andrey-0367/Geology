export type Category = {
  id: string;
  name: string;
  imageUrl: string; 
};

export type CategoryCardProps = {
  category: Category;
  onClick?: () => void;
};