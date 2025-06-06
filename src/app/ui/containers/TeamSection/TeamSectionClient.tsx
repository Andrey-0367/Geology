"use client";

import { useState, useEffect } from "react";
import style from "./TeamSection.module.scss";
import { CardTeamUI, TeamMember } from "@/app/ui/components/CardTeam/CardTeam";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useMediaQuery } from "react-responsive";
import { Title } from "@/components/Title/Title";

interface TeamSectionClientProps {
  data: TeamMember[];
}

export function TeamSectionClient({ data }: TeamSectionClientProps) {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
   if (!data || data.length === 0) {
    return <div className={style.error}>Нет данных о команде</div>;
  }

  return (
    <section className={style.teamSection}>
      <Title tag="h1">Наша команда</Title>

      {!isMobile ? (
        <ul className={style.employeeList}>
          {data.map((item) => (
            <li className={style.employee} key={item.id}>
              <CardTeamUI
                {...item}
                wideCard={false}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className={style.mobileSlider}>
          <Swiper
            slidesPerView="auto"
            spaceBetween={18}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className={style.swiperContainer}
          >
            {data.map((item) => (
              <SwiperSlide key={item.id} className={style.swiperSlide}>
                <CardTeamUI
                  {...item}
                  wideCard={false}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
}