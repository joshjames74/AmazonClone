import { Category } from "../../api/entities";

export const setCategories = (categories: Category[]) => ({
  type: "SET_CATEGORIES" as const,
  payload: categories,
});

export type SettingsActionTypes = ReturnType<typeof setCategories>;
