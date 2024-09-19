import { Reducer } from "@reduxjs/toolkit";
import { User } from "../../data-source";

interface UserState {
  user: User;
  conversionMultiple: number;
  userCurrencySymbol: string;
}

const initialState: UserState = {
  user: new User(),
  conversionMultiple: 1.0,
  userCurrencySymbol: "$",
};

const userReducer: Reducer<UserState, any> = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CONVERSION_MULTIPLE":
      return { ...state, conversionMultiple: action.payload };
    case "SET_USER_CURRENCY_SYMBOL":
      return { ...state, userCurrencySymbol: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default userReducer;
