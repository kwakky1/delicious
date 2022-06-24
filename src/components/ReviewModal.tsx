import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import LongTextInput from "./form/LongTextInput";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { RestaurantType } from "../../pages/api/restaurant/fetch";
import { server } from "../config";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import makeProperties from "./util/makPropertiese";
import { fetchRestaurantList } from "../../pages/random";

interface ReviewModalProps {
  restaurant: RestaurantType;
  modal: boolean;
  setModal: (value: boolean) => void;
}

interface ReviewInputType {
  person: string;
  review: string;
}

const reviewField = [{ field: "review", label: "리뷰", type: "longText" }];

export const updateRestaurant = async (
  data: RestaurantType,
  field: string
): Promise<RestaurantType> => {
  const properties = makeProperties({ field: field, data });
  const res = await fetch(`${server}/api/restaurant/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ page_id: data.id, properties }),
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error("updateRestaurant Network response not ok");
};

const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: RestaurantType) => updateRestaurant(data, "review"),
    {
      onMutate: (data) => {
        queryClient.setQueryData(["restaurantList", { id: data.id }], data);
      },
    }
  );
};

const ReviewModal = (props: ReviewModalProps) => {
  const { modal, setModal, restaurant } = props;
  const { mutate } = useUpdateRestaurant();

  const methods = useForm<ReviewInputType>({
    defaultValues: { review: restaurant.review },
    mode: "all",
  });

  const handleClose = () => {
    setModal(false);
  };

  const onSubmit: SubmitHandler<ReviewInputType> = (data) => {
    const originValue = restaurant;
    originValue.review = data.review;
    updateRestaurant(originValue, "review").then((res) => {
      mutate(res);
    });
    handleClose();
  };
  return (
    <>
      <Dialog open={modal} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          브리즈머들을 위해 리뷰를 남겨주세요
        </DialogTitle>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <DialogContent>
              <Grid container spacing={2}>
                {reviewField.map((row) => {
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
            </DialogContent>
            <DialogActions>
              <Button variant={"contained"} onClick={handleClose}>
                취소
              </Button>
              <Button type={"submit"} variant={"contained"} autoFocus>
                작성
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default ReviewModal;
