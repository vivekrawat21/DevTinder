import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./fetures/userAuth/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
