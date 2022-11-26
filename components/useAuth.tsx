import React, { useState } from 'react';
import {
    ACCESS_TOKEN_LOCAL_STORAGE_KEY,
    REFRESH_TOKEN_LOCAL_STORAGE_KEY,
} from '../utils/constants';
import {
    deleteFromLocalStorage,
    getFromLocalStorage,
    saveToLocalStorage,
} from '../utils/localStorage';
import { EASY_ERP_LOGIN_URL, EASY_ERP_PROFILE_URL } from '../utils/urls';
import useApi from './useApi';

type User = {
    firstName?: string;
    lastName?: string;
    username?: string;
};

interface IAuthProvider {
    user: User | null | undefined;
    setUser: (user: User) => void;
    register: (email: string, password: string) => void;
    login: (email?: string, password?: string) => Promise<boolean>;
    logout: () => void;
    updatePassword: (password: string) => void;
}

const AuthContext = React.createContext<IAuthProvider>({
    user: null,
    setUser: () => {},
    register: () => {},
    login: async () => false,
    logout: () => {},
    updatePassword: () => {},
});
export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null | undefined>();

    const axios = useApi();

    const register = (email: string, password: string) => {
        // TODO: call API
    };

    const login = async (
        email?: string,
        password?: string
    ): Promise<boolean> => {
        if (email !== '' && password !== '') {
            axios.publicAxios
                .post(EASY_ERP_LOGIN_URL, { email: email, password: password })
                .then(response => {
                    saveToLocalStorage(
                        ACCESS_TOKEN_LOCAL_STORAGE_KEY,
                        response.data.access
                    );
                    saveToLocalStorage(
                        REFRESH_TOKEN_LOCAL_STORAGE_KEY,
                        response.data.refresh
                    );
                    getProfileInfo();
                    return true;
                })
                .catch(error => {
                    console.log(error); // todo
                });
        }
        return false;
    };

    const getProfileInfo = async () => {
        axios.authAxios
            .get(EASY_ERP_PROFILE_URL)
            .then(response => {
                setUser({
                    firstName: response.data.first_name,
                    lastName: response.data.last_name,
                    username: response.data.username,
                });
            })
            .catch(error => {
                console.log(error); // todo
            });
    };

    const logout = () => {
        if (getFromLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY)) {
            deleteFromLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
            deleteFromLocalStorage(REFRESH_TOKEN_LOCAL_STORAGE_KEY);
        }
    };

    const updatePassword = (password: string) => {
        // TODO: call API
    };

    const value = {
        user,
        setUser,
        register,
        login,
        logout,
        updatePassword,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
