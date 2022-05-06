import type { NextPage } from "next";
import Layout from "../src/components/common/Layout";
import { Container } from "@mui/material";
import React from "react";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <Container maxWidth={"xl"}>
          <div>home</div>
        </Container>
      </Layout>
    </>
  );
};

export default Home;
