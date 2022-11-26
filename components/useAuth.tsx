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
    EASY_ERP_BASE_URL,
    EASY_ERP_LOGIN_URL,
    EASY_ERP_PROFILE_URL,
} from '../utils/urls';

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

    const register = (email: string, password: string) => {
        // TODO: call API
    };

    const login = async (
        email?: string,
        password?: string
    ): Promise<boolean> => {
        if (email !== '' && password !== '') {
            await fetch(EASY_ERP_BASE_URL + EASY_ERP_LOGIN_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password }),
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Invalid credentials');
                    }
                })
                .then(data => {
                    saveToLocalStorage(
                        ACCESS_TOKEN_LOCAL_STORAGE_KEY,
                        data.access
                    );
                    saveToLocalStorage(
                        REFRESH_TOKEN_LOCAL_STORAGE_KEY,
                        data.refresh
                    );
                    getProfileInfo();
                    return true;
                })
                .catch(error => {
                    // TODO: should we log errors? We could then gain better understanding if something is not working properly
                    console.error(error);
                });
        }

        return false;
    };

    const getProfileInfo = async () => {
        await fetch(EASY_ERP_BASE_URL + EASY_ERP_PROFILE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer ' +
                    getFromLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY),
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Invalid token');
                }
            })
            .then(data => {
                setUser({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    username: data.username,
                });

                return true;
            })
            .catch(error => {
                // TODO: should we log errors? We could then gain better understanding if something is not working properly
                console.error(error);
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
