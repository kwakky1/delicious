import React from "react";
import { Grid, MenuItem, TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { InputType } from "../Interface";

const SingleSelect = ({ field, label, option }: InputType) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const makeOption = () =>
    option?.map((obj) => {
      return (
        <MenuItem key={obj.value} value={obj.value}>
          {obj.label}
        </MenuItem>
      );
    });
  return (
    <Grid item xs={2}>
      <Controller
        name={field}
        control={control}
        render={({
          field: { onChange, value, ref },
          fieldState: { invalid },
        }) => (
          <TextField
            name={field}
            onChange={onChange}
            value={value || ""}
            label={label}
            inputRef={ref}
            select
            size="small"
            fullWidth
            error={invalid && Boolean(errors[`${field}`] || false)}
            helperText={invalid && errors[`${field}`]?.message}
            // SelectProps={{ renderValue: (obj: any) => option?.find((opt) => opt.value === obj)?.label }}
          >
            {makeOption()}
          </TextField>
        )}
      />
    </Grid>
  );
};

export default SingleSelect;
