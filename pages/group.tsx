import React from "react";
import Layout from "../src/components/common/Layout";
import { Box, Container, Grid, Typography } from "@mui/material";
import makeGroup from "../src/components/util/makeGroup";

const Group = () => {
  const group = makeGroup();
  return (
    <>
      <Layout>
        <Container maxWidth={"xl"}>
          <Box p={4}>
            <Grid container spacing={0.5}>
              {group.map((team, index) => {
                return (
                  <Grid key={index} item xs={4}>
                    <Box p={2}>
                      {team.map((member, index) => {
                        return (
                          <Typography
                            key={index}
                            sx={index === 0 ? { fontWeight: "bold" } : {}}
                          >
                            {index === 0 ? `조장: ${member}` : member}
                          </Typography>
                        );
                      })}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Container>
      </Layout>
    </>
  );
};

export default Group;
