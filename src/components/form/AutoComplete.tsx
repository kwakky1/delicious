import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery, UseQueryResult } from "react-query";
/*import { fetchUserList } from "../TabComponent";*/

/*interface AutoCompleteProps {
  restaurant: RestaurantType;
  setOpen: (value: boolean) => void;
}*/

const AutoComplete = (/*{ restaurant, setOpen }: AutoCompleteProps*/) => {
  /*const { data: userList }: UseQueryResult<UserType[], Error> = useQuery<
    UserType[],
    Error
  >("userList", fetchUserList);

  const [value, setValue] = useState<{ id: string; label: string } | null>(
    null
  );
  const makeOption = () => {
    return userList?.map((user) => {
      const { id, name } = user;
      return { id, label: name };
    });
  };
  const handleOnchange = (obj: { id: string; label: string } | null) => {
    if (obj) {
      const copyRestaurant = restaurant;
      copyRestaurant.picker.push(obj);
      setValue(obj);
      updateRestaurant(copyRestaurant, "picker").then();
      setOpen(false);
    }
  };*/
  return (
    <div></div>
    /*<Autocomplete
      sx={{ width: 100 }}
      value={value}
      onChange={(event, value, reason, details) => handleOnchange(value)}
      isOptionEqualToValue={(option, obj) => option.label === obj.label}
      disablePortal
      options={makeOption() || []}
      size="small"
      renderInput={(params) => (
        <TextField {...params} size={"small"} label="추천" />
      )}
    />*/
  );
};

export default AutoComplete;
