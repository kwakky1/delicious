import React, { useMemo, useState } from "react";
import Layout from "../src/components/common/Layout";
import { Box, Container, Typography } from "@mui/material";
import { useQuery, UseQueryResult } from "react-query";
import { RestaurantType } from "./api/restaurant/fetch";
import { fetchRestaurantList } from "./random";
import TotalMap from "../src/components/TotalMap";
import SearchBar from "../src/components/common/SearchBar";
import findRestaurantType from "../src/components/util/findRestaurantType";
import TypeFilter from "../src/components/TypeFilter";

const Map = () => {
  const { data: restaurantList }: UseQueryResult<RestaurantType[], Error> =
    useQuery<RestaurantType[], Error>("restaurantList", fetchRestaurantList);

  const [search, setSearch] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string[]>([]);

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
        <Container maxWidth={"xl"}>
          <Typography mt={2} fontSize={20} fontWeight={"bold"}>
            브릿즘 맛집 지도
          </Typography>
          <Box py={2}>
            <SearchBar value={search} setValue={setSearch} />
          </Box>
          <TypeFilter
            typeList={typeList}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
          />
          <Box mt={2}>
            {/*<TotalMap restaurantList={filteredRestaurant} />*/}
          </Box>
        </Container>
      </Layout>
    </>
  );
};

export default Map;
