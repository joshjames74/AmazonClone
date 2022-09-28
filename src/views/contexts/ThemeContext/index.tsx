import React, { useState } from "react";

export interface ITheme {
  theme: {
      colors: {
      primaryAccent: string;
      secondaryAccent: string;
      primaryText: string;
      secondaryText: string;
      product: {
        background: string;
        border: string;
      }
    }
  }
};

export const ThemeContext = React.createContext<ITheme>(null);

export const ThemeProvider = (props: {
  children?: JSX.Element;
}): JSX.Element => {
  const theme: ITheme = {
    theme: {
      colors: {
        primaryAccent: 'teal.500',
        secondaryAccent: 'yellow.100',
        primaryText: 'black',
        secondaryText: 'blue',
        product: {
          background: 'white',
          border: 'teal'
        }
      }
    }
  }
  const {children}: any = props;

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
