import { RestaurantType } from "../../../pages/api/restaurant/fetch";

const findRestaurantType = (restaurantList: RestaurantType[]) => {
  return restaurantList
    ?.map((store) => store.type)
    .filter(
      (v, i) => restaurantList?.map((store) => store.type).indexOf(v) === i
    );
};

export default findRestaurantType;
