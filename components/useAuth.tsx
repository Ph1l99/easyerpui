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
import {
    EASY_ERP_LOGIN_URL,
    EASY_ERP_PROFILE_URL,
    EASY_ERP_SIGNUP_URL,
} from '../utils/urls';
import useApi from './useApi';
import { router } from 'next/client';

type User = {
    firstName?: string;
    lastName?: string;
    username?: string;
};

type UserRegistration = {
    email?: string;
    password?: string;
    profile?: {
        first_name?: string;
        last_name?: string;
        username?: string;
    };
};

interface IAuthProvider {
    user: User | null | undefined;
    setUser: (user: User) => void;
    signup: (userReg: UserRegistration) => Promise<void>;
    login: (email?: string, password?: string) => Promise<void>;
    logout: () => void;
    updatePassword: (password: string) => void;
    getProfileInfo: () => Promise<void>;
}

const AuthContext = React.createContext<IAuthProvider>({
    user: null,
    setUser: () => {},
    signup: async () => {},
    login: async () => {},
    logout: () => {},
    updatePassword: () => {},
    getProfileInfo: async () => {},
});
export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null | undefined>();

    const axios = useApi();

    const signup = async (userReg: UserRegistration): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (userReg) {
                axios.publicAxios
                    .post(EASY_ERP_SIGNUP_URL, userReg)
                    .then(response => {
                        resolve();
                    })
                    .catch(error => {
                        reject();
                    });
            } else {
                reject();
            }
        });
    };

    const login = async (email?: string, password?: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (email !== '' && password !== '') {
                axios.publicAxios
                    .post(EASY_ERP_LOGIN_URL, {
                        email: email,
                        password: password,
                    })
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
                        resolve();
                    })
                    .catch(error => {
                        reject();
                    });
            } else {
                reject();
            }
        });
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
        router.push(`${EASY_ERP_LOGIN_URL}`);
    };

    const updatePassword = (password: string) => {
        // TODO: call API
    };

    const value = {
        user,
        setUser,
        signup,
        login,
        logout,
        updatePassword,
        getProfileInfo,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
