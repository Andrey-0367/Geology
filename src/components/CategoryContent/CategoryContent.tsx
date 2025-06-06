import { Category } from "@/types/category";

interface CategoryContentProps {
  data: Category;
}

export default function CategoryContent({ data }: CategoryContentProps) {
  return (
    <div className="category-content">
      <h1>{data.name}</h1>
      <img 
        src={data.image_url} 
        alt={data.name} 
        className="category-image"
      />
      <p>{data.description}</p>
    </div>
  );
}