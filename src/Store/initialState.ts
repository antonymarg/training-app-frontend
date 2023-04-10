import { RootState } from "./store.types";

export const initialState: RootState = {
  user: {
    isLoggedIn: false,
    role: null,
  },
};
