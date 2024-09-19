import { Reducer } from "@reduxjs/toolkit";

interface UserState {
  conversionMultiple: number;
  userCurrencySymbol: string;
}

const initialState: UserState = {
  conversionMultiple: 1.0,
  userCurrencySymbol: "$",
};

const userReducer: Reducer<UserState, any> = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CONVERSION_MULTIPLE":
      return { ...state, conversionMultiple: action.payload };
    case "SET_USER_CURRENCY_SYMBOL":
      return { ...state, userCurrencySymbol: action.payload };
    default:
      return state;
  }
};

export default userReducer;
