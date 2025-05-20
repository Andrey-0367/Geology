import Link from "next/link";
import styles from "./ContactSocialLinks.module.scss";

type TContactsSocialIcons = {
  link: string;
  imgSRC: string;
  imgALT: string;
};

type TSocialLinksIcons = {
  socialLinksIcons: TContactsSocialIcons[];
};

export const socialLinksIcons = [
  {
    imgSRC: "/Geology/icon_vk.png",
    imgALT: "ВКонтакте",
    link: "#",
  },
  {
    imgSRC: "/Geology/icon_odnoklassniki.png",
    imgALT: "Одноклассники",
    link: "#",
  },
  {
    imgSRC: "/Geology/icon_dzen.png",
    imgALT: "Дзен",
    link: "#",
  },
  {
    imgSRC: "/Geology/icon_telegram.png",
    imgALT: "Telegram",
    link: "#",
  },
  {
    imgSRC: "/Geology/icon_rutube.png",
    imgALT: "Rutube",
    link: "#",
  },
  {
    imgSRC: "/Geology/icon_youtube.png",
    imgALT: "YouTube",
    link: "#",
  },
];

export const ContactSocialLinks = ({ socialLinksIcons }: TSocialLinksIcons) => {
  return (
    <div className={styles.socialLinksIcons}>
      {socialLinksIcons.map((item, index) => (
        <Link href={item.link} key={index}>
          <img className={styles.img} src={item.imgSRC} alt={item.imgALT} />
        </Link>
      ))}
    </div>
  );
};
