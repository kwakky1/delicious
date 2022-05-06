import React from "react";
import { Box, Button, Modal } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Image from "next/image";
interface StoreMenuProps {
  imgList: string[] | undefined;
  openStoreMenu: boolean;
  setOpenStoreMenu: (value: boolean) => void;
}

const StoreMenu = ({
  imgList,
  openStoreMenu,
  setOpenStoreMenu,
}: StoreMenuProps) => {
  if (!imgList) {
    return null;
  }
  return (
    <Modal open={openStoreMenu}>
      <>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {imgList.map((imgUrl, index) => (
            <SwiperSlide key={`img_${index}`}>
              <Image
                src={imgUrl}
                alt={`img_${index}`}
                width={200}
                height={200}
                placeholder={"blur"}
                blurDataURL={imgUrl}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </Modal>
  );
};

export default StoreMenu;
