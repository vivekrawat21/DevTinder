import { createSlice } from "@reduxjs/toolkit";

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logoutUser } = userAuthSlice.actions;
export default userAuthSlice.reducer;
