export type Category = {
  id: string;
  name: string;
  imageUrl: string | null;
  parent: string | null;
};

export type CategoryCardProps = {
  category: Category;
  onClick?: () => void;
};