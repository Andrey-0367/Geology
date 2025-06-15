"use client";

import React from "react";
import styles from "./CatalogMenu.module.scss";
import { Category } from "@/types/category";
import { useRouter, usePathname } from "next/navigation";

type CatalogMenuProps = {
  categories: Category[];
};

const CatalogMenu: React.FC<CatalogMenuProps> = ({ categories }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isCatalogRoot = pathname === "/shop";
  const activeCategoryId = isCatalogRoot
    ? "catalog"
    : pathname.split("/").pop() || null;

  const handleCategorySelect = (categoryId: string | number) => {
    if (categoryId === "catalog") {
      router.push("/shop");
    } else {
      router.push(`/shop/category/${categoryId}`);
    }
  };

  return (
    <div className={styles.menu}>
       <div className={styles.menuHeader}>МЕНЮ</div>
      <ul className={styles.categoriesList}>
        <li
          key="catalog"
          className={`${styles.categoryItem} ${
            activeCategoryId === "catalog" ? styles.active : ""
          }`}
          onClick={() => handleCategorySelect("catalog")}
        >
         <span className={styles.catalogTitle}>Каталог</span> 
        </li>

        {categories.map((category) => (
          <li
            key={category.id}
            className={`${styles.categoryItem} ${
              activeCategoryId === String(category.id) ? styles.active : ""
            }`}
            onClick={() => handleCategorySelect(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatalogMenu;
