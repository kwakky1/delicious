import React from "react";
import { Chip, Stack } from "@mui/material";

interface TypeFilterProps {
  typeList: string[] | undefined;
  typeFilter: string[];
  setTypeFilter: (value: string[]) => void;
}

const TypeFilter = ({
  typeList,
  typeFilter,
  setTypeFilter,
}: TypeFilterProps) => {
  if (!typeList) return null;

  const handleClick = (type: string) => {
    if (typeFilter.includes(type)) {
      const filteredTypeList = typeFilter.filter((filter) => filter !== type);
      setTypeFilter(filteredTypeList);
    } else {
      setTypeFilter([...typeFilter, type]);
    }
  };
  return (
    <Stack direction="row" spacing={1}>
      {typeList.map((type) => (
        <Chip
          key={type}
          label={type}
          clickable
          color={typeFilter.includes(type) ? "primary" : undefined}
          onClick={() => handleClick(type)}
        />
      ))}
    </Stack>
  );
};

export default TypeFilter;
