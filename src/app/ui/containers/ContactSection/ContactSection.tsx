"use clients";

import { Title } from "@/components/Title/Title";
import styles from "./ContactSection.module.scss";
import {
  ContactSocialLinks,
  socialLinksIcons,
} from "./ContactSocialLinks/ContactSocialLinks";
import { YandexMap } from "./YandexMap/YandexMap";

interface ContactSectionProps {
  title?: string;
  phone?: string;
  address?: string;
  email?: string;
}

export const ContactSection = ({
  title = "Контакты",
  phone = "+7(925)222-33-22",
  address = "Московская область, Левково, 234В/2",
  email = "geology@mail.ru",
}: ContactSectionProps) => {
  return (
    <section className={styles.contactSection}>
      <Title tag={"h1"} className={styles.sectionTitle}>
        {title}
      </Title>
      <div className={styles.contactSection__container}>
        <div className={styles.contactSection__promo}>
          <Title className={styles.contactSection__title} tag={"h3"}>
            Связаться с нами легко!
          </Title>
         
          <address className={styles.adress}>
            <p>Телефон:</p>
            <a href={`tel:${phone}`}>{phone}</a>
            <p>Адрес:</p>
            <span>{address}</span>
            <p>Почта:</p>
            <a href={`mailto:${email}`}>{email}</a>
          </address>
          <ContactSocialLinks socialLinksIcons={socialLinksIcons} />
        </div>
        <div className={styles.contactSection__map}>
          <YandexMap />
        </div>
      </div>
    </section>
  );
};
