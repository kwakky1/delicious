import React, { useMemo, useState, Suspense } from "react";
import Layout from "../src/components/common/Layout";
import { RestaurantType } from "./api/restaurant/fetch";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQuery,
  UseQueryResult,
} from "react-query";

import { GetStaticProps } from "next";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import MultiSelect from "../src/components/form/MultiSelect";
import { server } from "../src/config";
import RandomModal from "../src/components/RandomModal";

export const fetchRestaurantList = async (): Promise<RestaurantType[]> => {
  const res = await fetch(`${server}/api/restaurant/fetch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error("FetchRestaurantList Network response not ok");
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<{
  props: { dehydratedState: DehydratedState };
}> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("restaurantList", fetchRestaurantList);
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

interface FormInput {
  type: string[];
  person: string[];
  place: string[];
}

export interface InputType {
  field: string;
  type: string;
  label: string;
  option?: string[] | { id: string; label: string }[];
}

const Random = () => {
  const [modal, setModal] = useState<boolean>(false);

  const {
    data: restaurantList,
    isLoading,
  }: UseQueryResult<RestaurantType[], Error> = useQuery<
    RestaurantType[],
    Error
  >("restaurantList", fetchRestaurantList);
  const methods = useForm<FormInput>({ mode: "all" });
  const typeOption = restaurantList
    ?.map((store) => store.type)
    .filter(
      (v, i) => restaurantList?.map((store) => store.type).indexOf(v) === i
    );
  const personOption = restaurantList
    ?.map((store) => store.picker)
    .reduce((acc, cur) => acc.concat(cur))
    .filter(
      (arr, index, callback) =>
        index === callback.findIndex((t) => t.id === arr.id)
    );

  const form: InputType[] = [
    {
      field: "type",
      type: "multiSelect",
      label: "??????",
      option: typeOption || [],
    },
    {
      field: "person",
      type: "multiSelect",
      label: "????????????",
      option: personOption || [],
    },
    {
      field: "place",
      type: "multiSelect",
      label: "??????",
      option: ["??????", "??????"],
    },
  ];
  const [filter, setFilter] = useState<FormInput | null>(null);
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    setFilter(data);
    setModal(true);
  };

  const filteredRestaurant = useMemo(
    () =>
      restaurantList
        ?.filter((store) => {
          if (filter?.type && filter?.type.length > 0) {
            return filter?.type?.includes(store.type);
          }
          return true;
        })
        .filter((store) => {
          if (filter?.person && filter?.person.length > 0) {
            return store.picker.find((person) =>
              filter.person.includes(person.label)
            );
          }
          return true;
        })
        .filter((store) => {
          if (filter?.place?.includes("??????")) {
            return store.delivery;
          } else if (filter?.place?.includes("??????")) {
            return store.visit;
          } else if (
            filter?.place?.includes("??????") &&
            filter?.place?.includes("??????")
          ) {
            return store.delivery && store.visit;
          }
          return true;
        }),
    [filter, restaurantList]
  );

  return (
    <>
      <Layout>
        <Container maxWidth={"xl"}>
          <Box pt={4}>
            <Typography align={"center"} variant={"h4"}>
              ????????? ????????? ????????????
            </Typography>
          </Box>
          <Container maxWidth={"md"}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container spacing={2} pt={2} flexDirection={"column"}>
                  {form.map((input) => {
                    const { type, field, label, option } = input;
                    switch (type) {
                      case "multiSelect":
                        return (
                          <MultiSelect
                            key={field}
                            type={type}
                            field={field}
                            label={label}
                            option={option}
                          />
                        );
                      default:
                        return null;
                    }
                  })}
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      fullWidth
                    >
                      ????????????
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </FormProvider>
          </Container>
        </Container>
      </Layout>
      <RandomModal
        restaurantList={filteredRestaurant}
        modal={modal}
        setModal={setModal}
      />
    </>
  );
};

export default Random;
