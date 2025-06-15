import AboutUsSection from "@/app/ui/containers/AboutUsSection/AboutUsSection";
import styles from "./page.module.scss";
import { aboutUsData } from "@/app/ui/containers/AboutUsSection/mock";
import { ContactSection } from "@/app/ui/containers/ContactSection/ContactSection";
import TeamSection from "@/app/ui/containers/TeamSection/TeamSection";
import SaleSection from "@/app/ui/containers/SaleSection/SaleSection";

export default async function AboutPage() {


  return (
    <div className={styles.section}>
      <AboutUsSection {...aboutUsData} />
      <SaleSection />  
      <TeamSection />
      <ContactSection />
    </div>
  );
}