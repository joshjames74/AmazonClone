import React, { useState } from "react";

export interface ITheme {
  theme: {
    fonts: {
      primaryFont: string;
    };
    sizes: {
      borderWidth: string;
      borderRadius: string;
    };
    colors: {
      primaryAccent: string;
      secondaryAccent: string;
      primaryText: string;
      secondaryText: string;
      primaryBackground: string;
      secondaryBackground: string;
      primaryBorder: string;
      secondaryBorder: string;
      product: {
        background: string;
        border: string;
      };
    };
  };
}

export const ThemeContext = React.createContext<ITheme>(null);

export const ThemeProvider = (props: {
  children?: JSX.Element;
}): JSX.Element => {
  const theme: ITheme = {
    theme: {
      fonts: {
        primaryFont: "Arial",
      },
      sizes: {
        borderRadius: "2px",
        borderWidth: "2px",
      },
      colors: {
        primaryAccent: "teal.500",
        secondaryAccent: "yellow.100",
        primaryText: "black",
        secondaryText: "blue",
        primaryBackground: "white",
        secondaryBackground: "teal.100",
        primaryBorder: "black",
        secondaryBorder: "gray.500",
        product: {
          background: "white",
          border: "black",
        },
      },
    },
  };
  const { children }: any = props;

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
