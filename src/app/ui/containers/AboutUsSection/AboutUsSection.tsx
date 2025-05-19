"use client";

import React from "react";
import style from "./AboutUsSection.module.scss";
import { Title } from "@/components/Title/Title";

export interface AboutUsItem {
  src: string;
  alt: string;
  paragraphs: {
    Paragraph: string[];
  }[];
}

export interface AboutUsProps {
  title?: string;
  items?: AboutUsItem[];
}

export const AboutUsSection = ({
  title = "О нас",
  items = [],
}: AboutUsProps) => {
  if (!items || items.length === 0) {
    return <div className={style.emptyMessage}>Нет данных для отображения</div>;
  }

  return (
    <div className={style.aboutContainer}>
      <Title tag={"h1"}>{title}</Title>
      <div className={style.sectionsGrid}>
        {items.map((item, index) => (
          <section key={index}>
            <div className={style.imageWrapper}>
              <img
                src={item.src}
                alt={item.alt}
                className={style.image}
                loading="lazy"
              />
            </div>
            <div className={style.contentGrid}>
              {item.paragraphs.map((paragraphGroup, pIndex) => (
                <div key={pIndex} className={style[`paragraph-${pIndex + 1}`]}>
                  {paragraphGroup.Paragraph.map((paragraph, subIndex) => (
                    <p key={subIndex}>{paragraph}</p>
                  ))}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default AboutUsSection;
