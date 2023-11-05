"use client";

import type { NextPage } from "next";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";

const Home: NextPage = () => {
  const router = useRouter();
  const list = [
    { title: "맛집리스트", link: "/restaurant", icon: "🍽" },
    { title: "지도에서 보기", link: "/map", icon: "🤸🏼" },
    { title: "랜덤 뽑기", link: "/random", icon: "❓" },
  ];

  const handleRouter = (link: string) => {
    router.push(link);
  };
  return (
    <Container maxWidth={"lg"}>
      <Box p={5}>
        <Grid container flexDirection={"column"} spacing={2}>
          {list.map((item) => {
            return (
              <Grid item key={item.title}>
                <Box
                  sx={{
                    height: "25vh",
                    border: "2px solid",
                    borderRadius: 2,
                    p: 3,
                    px: { md: 20, sm: 3 },
                  }}
                >
                  <Grid container sx={{ height: "100%" }}>
                    <Grid item xs={6}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-around",
                          height: "100%",
                        }}
                      >
                        <Typography fontSize={22} fontWeight={"bold"}>
                          {item.title}
                        </Typography>
                        <Box>
                          <Button onClick={() => handleRouter(item.link)}>
                            시작하기
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        <Typography fontSize={50}>{item.icon}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
