// import Link from 'next/link';
// import { Category } from '@/types/category';

// async function getCategories(): Promise<Category[]> {
  
//   try {
//     const res = await fetch('https://api.example.com/categories', {
//       next: { revalidate: 3600 } 
//     });
    
//     if (!res.ok) throw new Error('Failed to fetch categories');
    
//     return res.json();
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     return [];
//   }
// }

// export default async function ShopPage() {
//   const categories = await getCategories();

//   return (
//     <div className="shop-page">
//       <h1>Категории товаров</h1>
//       <div className="categories-grid">
//         {categories.map((category) => (
//           <Link
//             key={category.id}
//             href={`/shop/${category.id}`}
//             className="category-card"
//           >
//             <img
//               src={category.image_url}
//               alt={category.name}
//               className="category-image"
//             />
//             <h3>{category.name}</h3>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }