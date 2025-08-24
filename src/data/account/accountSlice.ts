import { createSlice } from "@reduxjs/toolkit";
import { UserAuthentication } from "../../models/User";

const initialState: UserAuthentication = {
  user: "",
  loggedIn: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    successLogin: (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.user = initialState.user;
      state.loggedIn = initialState.loggedIn;
    },
  },
});

export const { successLogin, logout } = accountSlice.actions;
export default accountSlice.reducer;
