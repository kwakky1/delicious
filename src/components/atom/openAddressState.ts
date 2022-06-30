import { atom } from "recoil";

export default atom<boolean>({
  key: "openAddressState",
  default: false,
});
