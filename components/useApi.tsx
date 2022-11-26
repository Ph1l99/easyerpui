import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import {
    ACCESS_TOKEN_LOCAL_STORAGE_KEY,
    REFRESH_TOKEN_LOCAL_STORAGE_KEY,
} from '../utils/constants';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
    EASY_ERP_BASE_URL,
    EASY_ERP_LOGIN_URL,
    EASY_ERP_REFRESH_TOKEN_URL,
} from '../utils/urls';

export default function useApi() {
    const router = useRouter();

    const authenticated = axios.create({
        baseURL: EASY_ERP_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const unauthenticated = axios.create({
        baseURL: EASY_ERP_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    authenticated.interceptors.request.use(
        config => {
            if (config?.headers && !config.headers?.Authorization) {
                config.headers.Authorization = `Bearer ${getFromLocalStorage(
                    ACCESS_TOKEN_LOCAL_STORAGE_KEY
                )}`;
            }

            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    authenticated.interceptors.response.use(
        response => {
            return response;
        },
        async error => {
            if (error.response.status === 403) {
                const response = await unauthenticated.post(
                    EASY_ERP_REFRESH_TOKEN_URL,
                    {
                        refresh: getFromLocalStorage(
                            REFRESH_TOKEN_LOCAL_STORAGE_KEY
                        ),
                    }
                );

                if (response.status === 200) {
                    saveToLocalStorage(
                        ACCESS_TOKEN_LOCAL_STORAGE_KEY,
                        response.data.access
                    );
                    return authenticated(error.config);
                }
                await router.push(EASY_ERP_LOGIN_URL);
            }
            return Promise.reject(error);
        }
    );
    return { authAxios: authenticated, publicAxios: unauthenticated };
}
