import React from "react";

export const AuthContext = React.createContext({})

export const AuthProvider = (props: { children?: JSX.Element }) => {

  const { children }: any = props;

  return (
    <AuthContext.Provider
      value={{ }}
    >
      {children}
    </AuthContext.Provider>
  );
};
