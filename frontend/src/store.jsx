import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import userReducer from "./Slices/userSlice";
// import photoReducer from "./slices/photoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    // photo: photoReducer,
  },
});
