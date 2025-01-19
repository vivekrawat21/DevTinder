import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: [],
  },
  reducers: {
    setFeed: (state, action) => {
      return action.payload;
    },
    removeFromFeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    }
  },
});

export const { setFeed,removeFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
