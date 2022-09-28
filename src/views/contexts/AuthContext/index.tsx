import React, { ContextType, useState } from "react";
import { UserType } from "../../../types/Auth";
import { createContext } from "react";
import { User, Country, Currency } from "../../../api/entities";

export const AuthContext = React.createContext<{
  user: User;
  isLoggedIn: boolean;
  loading: boolean;
  userType?: UserType;
}>({
  user: new User(),
  isLoggedIn: false,
  loading: false,
});

export const AuthProvider = (props: { children?: JSX.Element }) => {
  const { children }: any = props;

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>({
    user_id: 1,
    first_name: "Joshua",
    user_name: "joshuajames",
    title: "Mr",
    country: new Country(),
    currency: new Currency(),
    image_url: "",
  });
  const [userType, setUserType] = useState<UserType>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isLoggedIn: isLoggedIn,
        loading: loading,
        userType: userType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
