import React from "react";

import Layout from "../src/components/common/Layout";
import {
  Button,
  Container,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useQuery, UseQueryResult } from "react-query";
import { RestaurantType } from "./api/restaurant/fetch";
import { fetchRestaurantList } from "./random";

const CellWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const List = () => {
  const { data: restaurantList }: UseQueryResult<RestaurantType[], Error> =
    useQuery<RestaurantType[], Error>("restaurantList", fetchRestaurantList);

  const handlePhone = (phoneNumber: string) => {
    console.log(phoneNumber);
    location.href = `tel:${phoneNumber}`;
  };

  const handleMenu = (imgUrl: string[]) => {
    console.log(imgUrl);
  };

  return (
    <>
      <Layout>
        <Container maxWidth={"xl"}>
          <Table>
            <TableBody>
              {restaurantList?.map((store) => {
                const { name, type, address, phone, img } = store;
                return (
                  <TableRow key={name}>
                    <CellWrapper>
                      <TableCell
                        sx={(theme) => ({
                          width: "100%",
                          [theme.breakpoints.down("md")]: {
                            padding: 0,
                          },
                        })}
                      >
                        {name}
                      </TableCell>
                      <TableCell
                        sx={(theme) => ({
                          width: "100%",
                          [theme.breakpoints.down("md")]: {
                            padding: 0,
                          },
                        })}
                      >
                        {type}
                      </TableCell>
                    </CellWrapper>
                    <TableCell>{address}</TableCell>
                    <CellWrapper>
                      <TableCell
                        sx={(theme) => ({
                          width: "100%",
                          [theme.breakpoints.down("md")]: {
                            padding: 0,
                          },
                        })}
                      >
                        <Button onClick={() => handlePhone(phone)} fullWidth>
                          전화
                        </Button>
                      </TableCell>
                      <TableCell
                        sx={(theme) => ({
                          width: "100%",
                          [theme.breakpoints.down("md")]: {
                            padding: 0,
                          },
                        })}
                      >
                        <Button onClick={() => handleMenu(img)} fullWidth>
                          메뉴
                        </Button>
                      </TableCell>
                    </CellWrapper>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Container>
      </Layout>
    </>
  );
};

export default List;
