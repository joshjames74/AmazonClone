import React from 'react';
import { UserType } from "../../../types/Auth";

const AuthContext = {
    customer: React.createContext(UserType.customer),
    seller: React.createContext(UserType.seller),
    admin: React.createContext(UserType.admin)
};
export default AuthContext;