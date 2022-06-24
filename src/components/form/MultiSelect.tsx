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
    option?.map((optionData) => {
      if (typeof optionData === "string") {
        return (
          <MenuItem key={optionData} value={optionData}>
            <Checkbox checked={value?.indexOf(optionData) > -1} />
            <ListItemText primary={optionData} />
          </MenuItem>
        );
      } else {
        return (
          <MenuItem key={optionData.id} value={optionData.label}>
            <Checkbox checked={value?.indexOf(optionData.label) > -1} />
            <ListItemText primary={optionData.label} />
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
