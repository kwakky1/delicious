import { useMemo } from "react";
import { RestaurantType } from "../../../pages/api/restaurant/fetch";

interface FilterProps {
  restaurantList: RestaurantType[];
  search: string;
  typeFilter: string[];
}

const Filter = ({ restaurantList, search, typeFilter }: FilterProps) => {
  return useMemo(
    () =>
      restaurantList.filter((store) => {
        if (search) {
          return store.name.includes(search);
        }
        if (typeFilter.length > 0) {
          return typeFilter.includes(store.type);
        }
        return true;
      }),
    [restaurantList, search, typeFilter]
  );
};

export default Filter;
