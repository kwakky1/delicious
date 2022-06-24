import React from "react";
import { InputType } from "../../../pages/random";
import { Controller, useFormContext } from "react-hook-form";
import { Grid, TextField } from "@mui/material";

const LongTextInput = ({ field, label }: InputType) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid item xs={12}>
      <Controller
        name={field}
        control={control}
        render={({
          field: { onChange, value, ref },
          fieldState: { invalid },
        }) => {
          return (
            <TextField
              fullWidth
              label={label}
              multiline
              rows={4}
              value={value || ""}
              onChange={onChange}
              error={invalid && Boolean(errors[`${field}`] || false)}
            />
          );
        }}
      />
    </Grid>
  );
};

export default LongTextInput;
