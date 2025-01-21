import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      return  action.payload;
    },
    logoutUser: () => {
      return null
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
