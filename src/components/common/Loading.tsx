import React from "react";
import { CircularProgress, Container } from "@mui/material";
import { Box } from "@mui/system";

const Loading = () => {
  return (
    <Container maxWidth={"xl"}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    </Container>
  );
};

export default Loading;
