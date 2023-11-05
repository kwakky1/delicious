"use client";

import React from "react";
import { Box, Container, Grid } from "@mui/material";
import { RestaurantType } from "../../api/restaurant/fetch";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import LongTextInput from "@/components/form/LongTextInput";

interface InsertProps {
  restaurant?: RestaurantType;
}

interface InsertInputType {
  name: string;
  type: string;
  address: string; // 상세주소까지 포함
  phone: string;
  delivery: boolean;
  visit: boolean;
}

const insertArray = [
  { label: "이름", field: "name", type: "text" },
  { label: "타입", field: "type", type: "singleSelect" },
  { label: "타입", field: "type", type: "address" },
  { label: "전화번호", field: "phone", type: "text" },
  { label: "배달가능", field: "delivery", type: "checkbox" },
  { label: "방문가능", field: "visit", type: "checkbox" },
];

const Insert = () => {
  const methods = useForm<InsertInputType>({ mode: "all" });

  const onSubmit: SubmitHandler<InsertInputType> = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth={"lg"}>
      <Box my={2}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {insertArray.map((row) => {
                const { type, label, field } = row;
                switch (type) {
                  case "longText":
                    return (
                      <LongTextInput
                        key={field}
                        field={field}
                        type={type}
                        label={label}
                      />
                    );
                  default:
                    return;
                }
              })}
            </Grid>
          </form>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default Insert;
