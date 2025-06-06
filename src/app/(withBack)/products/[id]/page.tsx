// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import styles from './page.module.scss';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   imageUrl: string;
//   details: string;
// }

// const ProductPage = ({ product }: { product: Product }) => {
//   const router = useRouter();

//   if (router.isFallback) {
//     return <div>Загрузка...</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.content}>
//         <div className={styles.imageWrapper}>
//           <Image
//             src={product.imageUrl}
//             alt={product.name}
//             width={800}
//             height={600}
//             className={styles.image}
//           />
//         </div>
//         <div className={styles.info}>
//           <h1>{product.name}</h1>
//           <p className={styles.price}>{product.price} руб.</p>
//           <div className={styles.description}>
//             <h3>Описание товара:</h3>
//             <p>{product.description}</p>
//           </div>
//           <div className={styles.details}>
//             <h3>Характеристики:</h3>
//             <p>{product.details}</p>
//           </div>
//           <button className={styles.button}>Добавить в корзину</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export async function getStaticPaths() {
//   const res = await fetch('https://api.example.com/products');
//   const products = await res.json();

//   const paths = products.map((product: Product) => ({
//     params: { productId: product.id },
//   }));

//   return { paths, fallback: true };
// }

// export async function getStaticProps({ params }: { params: { productId: string } }) {
//   const res = await fetch(`https://api.example.com/products/${params.productId}`);
//   const product = await res.json();

//   return {
//     props: { product },
//     revalidate: 60
//   };
// }

// export default ProductPage;