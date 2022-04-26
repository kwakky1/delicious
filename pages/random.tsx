import React, { useEffect, useState } from "react";
import Layout from "../src/components/common/Layout";
import { RestaurantType } from "./api/restaurant/fetch";
import { Container, Grid, TextField } from "@mui/material";
import { RandomReveal } from "react-random-reveal";

const Random = () => {
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
          <Grid container spacing={2}>
            <RandomReveal
              characters=" "
              duration={10}
              isPlaying
              characterSet={restaurantList.map((store) => store.name)}
            />
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default Random;
