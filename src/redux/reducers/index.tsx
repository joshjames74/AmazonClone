import { Reducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import productReducer from "./product";
import settingsReducer from "./settings";
import userReducer from "./user";

interface RootState {
  product: ReturnType<typeof productReducer>;
  user: ReturnType<typeof userReducer>;
  settings: ReturnType<typeof settingsReducer>;
}

const rootReducer: Reducer<RootState> = combineReducers({
  product: productReducer,
  user: userReducer,
  settings: settingsReducer,
});

export default rootReducer;
