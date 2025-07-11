"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import styles from "./SaleDetailSection.module.scss";
import { API } from "@/api/apiConfig";

export const SaleDetailSection = ({ itemId }: { itemId: number }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(API.saleItems.images(itemId));
        if (!response.ok) throw new Error("Failed to fetch images");
        
        const data = await response.json();
        
        // Используем изображения напрямую из API без добавления базового URL
        const imageUrls = data.results.map((img: any) => img.image);
        
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [itemId]);

  if (loading) return <div className={styles.loading}>Загрузка изображений...</div>;

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
                onError={(e) => {
                  // Обработка ошибок загрузки изображений
                  e.currentTarget.src = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/skoro.jpg`;
                }}
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