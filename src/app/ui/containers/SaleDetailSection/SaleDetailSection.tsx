"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import styles from "./SaleDetailSection.module.scss";

interface SaleDetailSectionProps {
  images: string[];
}

export const SaleDetailSection = ({ images }: SaleDetailSectionProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={styles.container}>
      {images.length > 0 ? (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          spaceBetween={30}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            slideShadows: true,
          }}
          breakpoints={{
            360: {
              spaceBetween: 20,
              coverflowEffect: { modifier: 0 },
            },
            769: {
              spaceBetween: 110,
              coverflowEffect: { modifier: 3 },
            },
          }}
          modules={[EffectCoverflow, Pagination]}
          className={styles.swiperContainer}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              <img 
                src={src} 
                alt={`Slide ${index + 1}`} 
                className={styles.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={styles.noImages}>Нет доступных изображений</div>
      )}
    </div>
  );
};