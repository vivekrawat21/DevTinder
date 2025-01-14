import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./fetures/userAuth/userAuthslice";

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
  },
});

export default store;
