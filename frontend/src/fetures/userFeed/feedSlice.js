import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: [], 
  },
  reducers: {
    setFeed: (state, action) => {
      state.feed = action.payload;
    },
    removeFromFeed: (state, action) => {
      const index = state.feed?.findIndex(user => user._id === action.payload._id);
      if (index !== -1) {
        state.feed.splice(index, 1); 
      }
    },
    clearFeed: (state) => {
      state.feed = [];
    },
  },
});

export const { setFeed, removeFromFeed,clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
