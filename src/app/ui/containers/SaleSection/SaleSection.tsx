"use client";

import { useState } from "react";
import styles from "./SaleSection.module.scss";
import { mockProducts } from "./mock";
import CardSaleUI from "@/components/CardSale/CardSale";

export default function SaleSection() {
  const [visibleItems] = useState(6);

  return (
    <section className={styles.saleSection}>
      <div className={styles.grid}>
        {mockProducts.map((product) => (
           <CardSaleUI
            key={product.id}
            {...product}
          />
        ))}
      </div>
    </section>
  );
}
