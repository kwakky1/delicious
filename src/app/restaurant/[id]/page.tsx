"use client";

import React from "react";
import { Box, Chip, Container, Fab, Grid, Typography } from "@mui/material";
import { useQuery, UseQueryResult } from "react-query";
import { RestaurantType } from "../../api/restaurant/fetch";
import { NextRouter, withRouter } from "next/router";
import PhoneIcon from "@mui/icons-material/Phone";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TabComponent from "@/components/TabComponent";

interface DetailProps {
  router: NextRouter;
}

const Detail = ({ router }: DetailProps) => {
  /*const { data: restaurantList }: UseQueryResult<RestaurantType[], Error> =
    useQuery<RestaurantType[], Error>("restaurantList", fetchRestaurantList);*/

  /*const restaurant: RestaurantType | undefined = restaurantList?.filter(
    (store) => store.id === router.query.id
  )[0];*/

  const handlePhone = (phone: string) => {
    location.href = `tel:${phone}`;
  };

  return (
    <Container maxWidth={"xl"}>
      <Container maxWidth={"sm"}>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 2,
            }}
          >
            <Grid container flexDirection={"column"} spacing={1}>
              <Grid item>
                <Typography fontWeight={"bold"} fontSize={30}>
                  {""}
                </Typography>
              </Grid>
              <Grid item>
                <Chip label={""} />
              </Grid>
            </Grid>
            <Box>
              <Fab size="medium" color="primary" onClick={() => {}}>
                <PhoneIcon />
              </Fab>
            </Box>
          </Box>
          {/*<TabComponent restaurant={restaurant} />*/}
        </Box>
      </Container>
    </Container>
  );
};

export default withRouter(Detail);
