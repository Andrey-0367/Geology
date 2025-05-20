import AboutUsSection from "@/app/ui/containers/AboutUsSection/AboutUsSection";
import styles from "./page.module.scss";
import { aboutUsData } from "@/app/ui/containers/AboutUsSection/mock";
import { ContactSection } from "@/app/ui/containers/ContactSection/ContactSection";
import { TeamSectionClient } from "@/app/ui/containers/TeamSection/TeamSectionClient";

export default async function AboutPage() {


  return (
    <div className={styles.section}>
      <AboutUsSection {...aboutUsData} />
      <TeamSectionClient />
      <ContactSection />
    </div>
  );
}