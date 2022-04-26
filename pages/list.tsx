import React, { Fragment, useEffect, useState } from "react";

import Layout from "../src/components/common/Layout";
import { Container, Grid, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { restaurantListState } from "../src/components/state";
import { RestaurantType } from "./api/restaurant/fetch";

const List = () => {
  const [restaurantList, setRestaurantList] = useState<RestaurantType[]>([]);

  useEffect(() => {
    fetchRestaurantList()
      .then((result) => {
        setRestaurantList(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setRestaurantList]);

  async function fetchRestaurantList() {
    const response = await fetch("/api/restaurant/fetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }
  return (
    <>
      <Layout>
        <Container maxWidth={"xl"}>
          <Grid container direction={"row"}>
            {restaurantList.map((restaurant) => {
              const {
                name,
                type,
                address,
                phone,
                delivery,
                visit,
                picker,
                review,
                img,
              } = restaurant;
              return (
                <Fragment key={name}>
                  <Grid xs={2} item>
                    <Typography>{name}</Typography>
                  </Grid>
                </Fragment>
              );
            })}
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default List;
