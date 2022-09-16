import React, { useState } from "react";

export const ThemeContext = React.createContext<{
  theme: Object;
}>({
  theme: {},
});

export const ThemeProvider = (props: {
  children?: JSX.Element;
}): JSX.Element => {
  const [theme, setTheme] = useState<any>({});
  const children: any = props;

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
