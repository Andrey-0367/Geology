"use client";

import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import styles from "./YandexMap.module.scss";

export const YandexMap = () => {
  return (
    <div className={styles.ymaps}>
      <YMaps query={{ apikey: process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY }}>
        <Map
          height="100%"
          width="100%"
          options={{
            autoFitToViewport: "none",
          }}
          defaultState={{
            center: [56.019247, 37.955254],
            zoom: 18,
          }}
          className={styles.map}
        >
          <ZoomControl />
          <GeolocationControl options={{ float: "right" }} />
          <Placemark
            defaultGeometry={[56.019247, 37.955254]}
            properties={{ iconCaption: "Geology" }}
          />
        </Map>
      </YMaps>
    </div>
  );
};
