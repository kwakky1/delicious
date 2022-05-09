import React from "react";
import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import Layout from "../../src/components/common/Layout";
import { useQuery, UseQueryResult } from "react-query";
import { RestaurantType } from "../api/restaurant/fetch";
import { fetchRestaurantList } from "../random";
import { NextRouter, withRouter } from "next/router";
import Image from "next/image";
import PhoneIcon from "@mui/icons-material/Phone";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import SingleMap from "../../src/components/SingleMap";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface DetailProps {
  router: NextRouter;
}

const Detail = ({ router }: DetailProps) => {
  const { data: restaurantList }: UseQueryResult<RestaurantType[], Error> =
    useQuery<RestaurantType[], Error>("restaurantList", fetchRestaurantList);

  const restaurant: RestaurantType | undefined = restaurantList?.filter(
    (store) => store.id === router.query.id
  )[0];

  const handlePhone = (phone: string) => {
    location.href = `tel:${phone}`;
  };
  SwiperCore.use([Navigation, Pagination]);
  if (!restaurant) return null;
  const { name, type, address, phone, img } = restaurant;
  return (
    <>
      <Layout>
        <Container maxWidth={"xl"}>
          <Container maxWidth={"sm"}>
            <Box>
              <Grid container rowSpacing={1} my={5}>
                <Grid item xs={6}>
                  <Grid container flexDirection={"column"} spacing={1}>
                    <Grid item>
                      <Typography fontWeight={"bold"} fontSize={30}>
                        {name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Chip label={type} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={6}
                  display={"flex"}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                >
                  <Box
                    sx={{
                      padding: 1,
                      border: "1px solid",
                      borderRadius: "50%",
                    }}
                    onClick={() => handlePhone(phone)}
                  >
                    <PhoneIcon />
                  </Box>
                </Grid>
              </Grid>
              <SingleMap address={address} code={"kakao_map"} />
              <Typography>{address}</Typography>
              <Typography>메뉴</Typography>
              <Swiper slidesPerView={1} spaceBetween={10} loop navigation>
                {img.map((url, index) => (
                  <SwiperSlide key={`image_${index}`}>
                    <Image
                      src={url}
                      width={500}
                      height={500}
                      placeholder={"blur"}
                      blurDataURL="/blur.jpg"
                      alt={`${name}_${index}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Container>
        </Container>
      </Layout>
    </>
  );
};

export default withRouter(Detail);
