import type { NextPage } from "next";
import Layout from "../src/components/common/Layout";
import { Box } from "@mui/material";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <Box>홈</Box>
      </Layout>
    </>
  );
};

export default Home;
