import React from "react";
import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { InputType } from "../../../pages/random";

const MultiSelect = ({ field, label, option }: InputType) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const makeOption = (value: any) =>
    option?.map((name) => {
      return (
        <MenuItem key={name} value={name}>
          <Checkbox checked={value?.indexOf(name) > -1} />
          <ListItemText primary={name} />
        </MenuItem>
      );
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
              value={value || []}
              label={label}
              inputRef={ref}
              multiple
              renderValue={(selected) => (selected as string[]).join(", ")}
              error={invalid && Boolean(errors[`${field}`] || false)}
            >
              {makeOption(value)}
            </Select>
          </FormControl>
        )}
      />
    </Grid>
  );
};

export default MultiSelect;
