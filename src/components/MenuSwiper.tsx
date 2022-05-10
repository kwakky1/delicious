import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import SwiperCore, { Navigation, Pagination } from "swiper";

interface MenuSwiperProps {
  img: string[];
}

const MenuSwiper = ({ img }: MenuSwiperProps) => {
  SwiperCore.use([Navigation, Pagination]);
  return (
    <Swiper slidesPerView={1} spaceBetween={10} navigation>
      {img.map((url, index) => (
        <SwiperSlide
          key={`image_${index}`}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Image
            src={url}
            width={500}
            height={500}
            placeholder={"blur"}
            blurDataURL="/blur.jpg"
            alt={`img_${index}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MenuSwiper;
