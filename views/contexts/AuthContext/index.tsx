import React, { ContextType, useState } from 'react';
import { UserType } from "../../../types/Auth";
import { createContext } from 'react';

export const AuthContext = React.createContext<{
    userId?: string;
    isLoggedIn: boolean;
    loading: boolean;
    userType?: UserType;
}>({
    userId: '',
    isLoggedIn: false,
    loading: false
});

export const AuthProvider = (props: { children?: JSX.Element}) => {
    const { children }: any = props;

    const [loading, setLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<string>('');
    const [userType, setUserType] = useState<UserType>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

    return (
        <AuthContext.Provider
        value={{
            userId: userId,
            isLoggedIn: isLoggedIn,
            loading: loading,
            userType: userType
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};
