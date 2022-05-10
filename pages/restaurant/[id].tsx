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
                      {name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Chip label={type} />
                  </Grid>
                </Grid>
                <Fab
                  size="medium"
                  color="primary"
                  onClick={() => handlePhone(phone)}
                >
                  <PhoneIcon />
                </Fab>
              </Box>
              <TabComponent restaurant={restaurant} />
            </Box>
          </Container>
        </Container>
      </Layout>
    </>
  );
};

export default withRouter(Detail);
