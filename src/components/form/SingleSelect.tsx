import React from "react";
import { InputType } from "../../../pages/random";
import { Controller, useFormContext } from "react-hook-form";
import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

const SingleSelect = ({ field, label, option }: InputType) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const makeOption = () =>
    option?.map((name) => {
      if (typeof name === "string") {
        return (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        );
      } else {
        return (
          <MenuItem key={name.id} value={name.label}>
            <Checkbox checked={name.label?.indexOf(name.label) > -1} />
            <ListItemText primary={name.label} />
          </MenuItem>
        );
      }
    });

  return (
    <Grid item xs={12}>
      <Controller
        name={field}
        control={control}
        render={({
          field: { onChange, value, ref },
          fieldState: { invalid },
        }) => (
          <FormControl fullWidth size="small">
            <InputLabel>{label}</InputLabel>
            <Select
              name={field}
              onChange={onChange}
              value={value || ""}
              label={label}
              inputRef={ref}
              error={invalid && Boolean(errors[`${field}`] || false)}
            >
              {makeOption()}
            </Select>
          </FormControl>
        )}
      />
    </Grid>
  );
};

export default SingleSelect;
