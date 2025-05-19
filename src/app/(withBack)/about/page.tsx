import AboutUsSection from "@/app/ui/containers/AboutUsSection/AboutUsSection";
import styles from "./page.module.scss";
import { aboutUsData } from "@/app/ui/containers/AboutUsSection/mock";
import { ContactSection } from "@/app/ui/containers/ContactSection/ContactSection";

export default async function AboutPage() {


  return (
    <div className={styles.section}>
      <AboutUsSection {...aboutUsData} />
      
     
      <ContactSection />
    </div>
  );
}