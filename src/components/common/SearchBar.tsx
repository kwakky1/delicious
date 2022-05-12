import React from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  value: string;
  setValue: (value: string) => void;
}

const SearchBar = ({ value, setValue }: SearchBarProps) => {
  return (
    <TextField
      size="small"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{
        startAdornment: <SearchIcon />,
        style: {
          paddingLeft: 4,
        },
      }}
      placeholder={"상호명"}
      fullWidth
    />
  );
};

export default SearchBar;
