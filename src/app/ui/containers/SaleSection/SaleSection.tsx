"use client";

import { useEffect, useState } from "react";
import styles from "./SaleSection.module.scss";
import CardSaleUI from "@/components/CardSale/CardSale";
import { SaleItem } from "@/types/sale";
import { getSale } from "@/api/sale";
import { Title } from "@/components/Title/Title";

export default function SaleSection() {
  const [items, setItems] = useState<SaleItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getSale();
      setItems(data);
    };
    fetchItems();
  }, []);

  return (
    <section className={styles.saleSection}>
      <Title tag={"h1"}>Распродажа</Title>
      <div className={styles.grid}>
        {items.map((item) => (
          <CardSaleUI
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </section>
  );
}