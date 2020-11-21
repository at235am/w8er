import { atom } from "recoil";

export const SaveButtonState = atom({
  key: "saveButtonState",
  // default: INITIAL_NODES,
  default: false,
});
