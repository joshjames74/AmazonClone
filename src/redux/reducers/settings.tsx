import { Reducer } from "@reduxjs/toolkit";
import { Category } from "../../api/entities";

interface SettingsState {
  categories: Category[];
}

const initialState = {
  categories: [],
};

const settingsReducer: Reducer<SettingsState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

export default settingsReducer;
