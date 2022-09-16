import React, { ContextType, useState } from "react";
import { UserType } from "../../../types/Auth";
import { createContext } from "react";

export const AuthContext = React.createContext<{
  userId: number;
  isLoggedIn: boolean;
  loading: boolean;
  userType?: UserType;
}>({
  userId: 1,
  isLoggedIn: false,
  loading: false,
});

export const AuthProvider = (props: { children?: JSX.Element }) => {
  const { children }: any = props;

  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<number>(1);
  const [userType, setUserType] = useState<UserType>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  return (
    <AuthContext.Provider
      value={{
        userId: userId,
        isLoggedIn: isLoggedIn,
        loading: loading,
        userType: userType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
