import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  // default: { cool: "test" }, // use this when testing restaurant professional stuff
  default: null,
});
