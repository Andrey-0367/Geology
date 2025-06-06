import { getCategoryData } from "@/api/categories";
import CategoryContent from "@/components/CategoryContent/CategoryContent";
import { redirect } from "next/navigation";


interface PageProps {
  params: {
    id: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  try {
    const { id } = params; 
    const data = await getCategoryData(id);

    if (!data) {
      redirect("/categories");
    }

    return <CategoryContent data={data} />;
  } catch (error) {
    console.error('Error loading category:', error);
    redirect("/categories");
  }
}
    