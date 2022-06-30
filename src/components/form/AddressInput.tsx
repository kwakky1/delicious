import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import openAddressState from "../atom/openAddressState";

interface AddressInputProps {
  field: string;
  label: string;
}

function AddressInput({ field, label }: AddressInputProps) {
  const { control, getValues } = useFormContext();
  const setOpenAddress = useSetRecoilState(openAddressState);

  if (!field) return null;
  return (
    <Grid item xs={12}>
      <Controller
        name={field}
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={
              value !== ""
                ? `${value} (${getValues ? getValues("extraAddress") : ""})`
                : value
            }
            label={label}
            size={"small"}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setOpenAddress(true)}
                >
                  주소찾기
                </Button>
              ),
            }}
            fullWidth
          />
        )}
      />
    </Grid>
  );
}

export default AddressInput;
