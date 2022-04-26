import { atom } from "recoil";
import { RestaurantType } from "../../pages/api/restaurant/fetch";

const restaurantListState = atom<RestaurantType[]>({
  key: "restaurantListState",
  default: [],
});

const userListState = atom({
  key: "userListState",
  default: [],
});

export { restaurantListState, userListState };
