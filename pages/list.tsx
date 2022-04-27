import React, { Fragment, useEffect, useState } from "react";

import Layout from "../src/components/common/Layout";
import { Container, Grid, Typography } from "@mui/material";
import { RestaurantType } from "./api/restaurant/fetch";

const List = () => {
  return (
    <>
      <Layout>
        <Container maxWidth={"xl"}>
          <Grid container direction={"row"}></Grid>
        </Container>
      </Layout>
    </>
  );
};

export default List;
