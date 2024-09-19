import { User } from "../../data-source";

export const setConversionMultiple = (conversionMultiple: number) => ({
  type: "SET_CONVERSION_MULTIPLE" as const,
  payload: conversionMultiple,
});

export const setUser = (user: User) => ({
  type: "SET_USER" as const,
  payload: user
})

export type UserActionTypes = ReturnType<typeof setConversionMultiple | typeof setUser>;
