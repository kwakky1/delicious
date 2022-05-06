import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Layout from "../../src/components/common/Layout";
import { useQuery, UseQueryResult } from "react-query";
import { RestaurantType } from "../api/restaurant/fetch";
import { fetchRestaurantList } from "../random";
import { NextRouter, withRouter } from "next/router";
import Image from "next/image";
import PhoneIcon from "@mui/icons-material/Phone";

interface DetailProps {
  router: NextRouter;
}

const Detail = ({ router }: DetailProps) => {
  const { data: restaurantList }: UseQueryResult<RestaurantType[], Error> =
    useQuery<RestaurantType[], Error>("restaurantList", fetchRestaurantList);

  const restaurant: RestaurantType | undefined = restaurantList?.filter(
    (store) => store.id === router.query.id
  )[0];

  const handlePhone = (phone: string) => {
    location.href = `tel:${phone}`;
  };

  if (!restaurant) return null;
  const { name, type, address, phone, img } = restaurant;
  return (
    <>
      <Layout>
        <Container maxWidth={"xl"}>
          <Box>
            <Typography>{name}</Typography>
            <Typography>{type}</Typography>
            <Typography>{address}</Typography>
            <Button
              variant="contained"
              endIcon={<PhoneIcon />}
              onClick={() => handlePhone(phone)}
            >
              전화하기
            </Button>
            <Typography>메뉴</Typography>
            {img.map((url, index) => (
              <Image
                key={`image_${index}`}
                src={url}
                width={400}
                height={200}
                placeholder={"blur"}
                blurDataURL={url}
                alt={`${name}_${index}`}
              />
            ))}
          </Box>
        </Container>
      </Layout>
    </>
  );
};

export default withRouter(Detail);
