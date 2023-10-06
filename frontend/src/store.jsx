import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import userReducer from "./Slices/userSlice";
import buttonReducer from "./Slices/ButtonSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    button: buttonReducer,
  },
});
