export const setConversionMultiple = (conversionMultiple: number) => ({
  type: "SET_CONVERSION_MULTIPLE" as const,
  payload: conversionMultiple,
});

export type UserActionTypes = ReturnType<typeof setConversionMultiple>;
