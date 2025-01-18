import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./fetures/userAuth/userSlice";
import feedReducer from "./fetures/userFeed/feedSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

export default store;
