import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import registrationReducer from "./registerSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    registration: registrationReducer,

  },
});

export default store;