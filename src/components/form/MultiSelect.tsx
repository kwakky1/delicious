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
import { InputType } from "../Interface";

const MultiSelect = ({ field, label, option }: InputType) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const makeOption = (value: any) =>
    option?.map((obj) => {
      return (
        <MenuItem key={obj.value} value={obj.value}>
          <Checkbox checked={value?.indexOf(obj.value) > -1} />
          <ListItemText primary={obj.label} />
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
