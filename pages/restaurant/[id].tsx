import React from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Fab,
  Grid,
  Typography,
} from "@mui/material";
import Layout from "../../src/components/common/Layout";
import { useQuery, UseQueryResult } from "react-query";
import { RestaurantType } from "../api/restaurant/fetch";
import { fetchRestaurantList } from "../random";
import { NextRouter, withRouter } from "next/router";
import PhoneIcon from "@mui/icons-material/Phone";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TabComponent from "../../src/components/TabComponent";

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

  if (!restaurant) return null;
  const { name, type, phone } = restaurant;
  return (
    <>
      <Layout>
        <Container maxWidth={"xl"}>
          <Container maxWidth={"sm"}>
            <Box>
              <Grid container rowSpacing={1} my={2}>
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
                  <Fab
                    size="medium"
                    color="primary"
                    onClick={() => handlePhone(phone)}
                  >
                    <PhoneIcon />
                  </Fab>
                </Grid>
              </Grid>
              <TabComponent restaurant={restaurant} />
              {/*<SingleMap address={address} code={"kakao_map"} />
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
              </Swiper>*/}
            </Box>
          </Container>
        </Container>
      </Layout>
    </>
  );
};

export default withRouter(Detail);
