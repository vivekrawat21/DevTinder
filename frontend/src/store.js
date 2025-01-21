import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./fetures/userAuth/userSlice";
import feedReducer from "./fetures/userFeed/feedSlice";
import connectionsReducer from "./fetures/connections/connectionsSlice.js";
import requestsReducer from "./fetures/requests/requestsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestsReducer,
  },
});

export default store;
