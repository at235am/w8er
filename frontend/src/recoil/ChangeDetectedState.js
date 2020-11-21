import { atom } from "recoil";

export const ChangeDetectedState = atom({
  key: "changeDetectedState",
  // default: INITIAL_NODES,
  default: false,
});
