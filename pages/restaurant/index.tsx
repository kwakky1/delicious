import React, { useCallback, useMemo, useState } from "react";

import Layout from "../../src/components/common/Layout";
import { Badge, Box, Button, Chip, Container, Grid } from "@mui/material";
import { useQuery, UseQueryResult } from "react-query";
import { RestaurantType } from "../api/restaurant/fetch";
import { fetchRestaurantList } from "../random";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useRouter } from "next/router";
import SearchBar from "../../src/components/common/SearchBar";
import TypeFilter from "../../src/components/TypeFilter";
import findRestaurantType from "../../src/components/util/findRestaurantType";

const List = () => {
  const { data: restaurantList }: UseQueryResult<RestaurantType[], Error> =
    useQuery<RestaurantType[], Error>("restaurantList", fetchRestaurantList);
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string[]>([]);

  const handleDetail = (id: string) => {
    router.push({
      pathname: "/restaurant/[id]",
      query: { id: id },
    });
  };

  const filteredRestaurant = useMemo(
    () =>
      restaurantList?.filter((store) => {
        if (search) {
          return store.name.includes(search);
        }
        if (typeFilter.length > 0) {
          return typeFilter.includes(store.type);
        }
        return true;
      }),
    [restaurantList, search, typeFilter]
  );

  if (!restaurantList) return null;

  const typeList = findRestaurantType(restaurantList);

  return (
    <>
      <Layout>
        <Container maxWidth={"lg"}>
          <Box my={2}>
            <SearchBar value={search} setValue={setSearch} />
          </Box>
          <TypeFilter
            typeList={typeList}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
          />
          <Box mt={5}>
            <Grid
              container
              spacing={1}
              py={2}
              sx={(theme) => ({
                [theme.breakpoints.down("md")]: {
                  display: "none",
                },
              })}
            >
              <Grid item md={2} sx={{ fontWeight: "bold" }}>
                상호명
              </Grid>
              <Grid item md={2} sx={{ fontWeight: "bold" }}>
                종류
              </Grid>
              <Grid item md={4} sx={{ fontWeight: "bold" }}>
                주소
              </Grid>
              <Grid item md={1} sx={{ fontWeight: "bold" }}>
                추천수
              </Grid>
              <Grid item md={2} sx={{ fontWeight: "bold" }}>
                전화번호
              </Grid>
              <Grid item md={1} />
            </Grid>
            <Box>
              {filteredRestaurant?.map((store) => {
                const { name, type, address, phone, picker, id } = store;
                return (
                  <Box
                    key={name}
                    sx={(theme) => ({
                      [theme.breakpoints.down("md")]: {
                        my: 2,
                        p: 1,
                        border: "1px solid #1976d2",
                        borderRadius: "25px",
                      },
                    })}
                  >
                    <Grid container py={2} rowSpacing={1} columnSpacing={1}>
                      <Grid
                        item
                        md={2}
                        xs={9}
                        display={"flex"}
                        alignItems={"center"}
                        sx={(theme) => ({
                          [theme.breakpoints.down("md")]: {
                            fontWeight: "bold",
                            fontSize: 18,
                            fontFamily: "Pretendard",
                          },
                        })}
                      >
                        {name}
                      </Grid>
                      <Grid item md={2} xs={3}>
                        <Chip label={type} />
                      </Grid>
                      <Grid
                        item
                        md={4}
                        xs={9}
                        display={"flex"}
                        alignItems={"center"}
                        sx={(theme) => ({
                          [theme.breakpoints.down("md")]: {
                            fontColor: "grey",
                            fontSize: 14,
                          },
                        })}
                      >
                        {address}
                      </Grid>
                      <Grid
                        item
                        md={1}
                        xs={3}
                        sx={(theme) => ({
                          [theme.breakpoints.down("md")]: {
                            display: "flex",
                            justifyContent: "center",
                          },
                        })}
                      >
                        <Badge
                          badgeContent={picker.length}
                          color="primary"
                          sx={{ left: 12 }}
                        >
                          <FavoriteBorderIcon color="error" />
                        </Badge>
                      </Grid>
                      <Grid
                        item
                        md={2}
                        xs={9}
                        display={"flex"}
                        alignItems={"center"}
                        sx={(theme) => ({
                          [theme.breakpoints.down("md")]: {
                            fontColor: "grey",
                            fontSize: 14,
                          },
                        })}
                      >
                        {phone}
                      </Grid>
                      <Grid md={1} xs={3} item onClick={() => handleDetail(id)}>
                        <Button variant={"contained"} size={"small"}>
                          자세히
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Container>
      </Layout>
    </>
  );
};

export default List;
