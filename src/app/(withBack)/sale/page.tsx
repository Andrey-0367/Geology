import styles from "./page.module.scss";
import { Title } from "@/components/Title/Title";
import SaleSection from "@/app/ui/containers/SaleSection/SaleSection";

export default function SalePage() {
  return (
    <div className={styles.container}>
      <Title tag={"h1"}>Распродажа</Title>
        <SaleSection />  
    </div>
  );
}
