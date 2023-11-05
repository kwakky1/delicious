"use client";

import React, { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import MakeTeam from "@/components/MakeTeam";

const Group = () => {
  const [result, setResult] = useState<{ name: string }[][]>([]);
  return (
    <Container maxWidth={"xl"}>
      <Box p={4}>
        <Grid container spacing={0.5}>
          {result?.map((team, index) => {
            return (
              <Grid key={index} item xs={4}>
                <Box p={2}>
                  {team.map((member, index) => {
                    return (
                      <Typography
                        key={index}
                        sx={index === 0 ? { fontWeight: "bold" } : {}}
                      >
                        {index === 0 ? `조장: ${member.name}` : member.name}
                      </Typography>
                    );
                  })}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box>
        <MakeTeam setResult={setResult} />
      </Box>
    </Container>
  );
};

export default Group;
