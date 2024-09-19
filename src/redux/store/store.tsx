import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducers/product";
import userReducer from "../reducers/user";
import settingsReducer from "../reducers/settings";

export const store = configureStore({
  reducer: {
    productReducer,
    userReducer,
    settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
