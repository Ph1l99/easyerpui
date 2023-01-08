import {
    deleteFromLocalStorage,
    getFromLocalStorage,
    saveToLocalStorage,
} from '../utils/localStorage';
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
import { useEffect, useState } from 'react';
import useTranslation from './useTranslation';

export default function useApi() {
    const router = useRouter();

    const { language } = useTranslation();

    const authenticated = axios.create({
        baseURL: EASY_ERP_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': language,
        },
    });

    const unauthenticated = axios.create({
        baseURL: EASY_ERP_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': language,
        },
    });

    // Attach interceptor to all requests in order to use the Bearer token
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

    // Attach interceptor to all responses
    authenticated.interceptors.response.use(
        response => response,
        async error => {
            const { response, config } = error;

            if (response.status === 403 && !config._retry) {
                config._retry = true;
                return await unauthenticated
                    .post(`${EASY_ERP_REFRESH_TOKEN_URL}`, {
                        refresh: getFromLocalStorage(
                            REFRESH_TOKEN_LOCAL_STORAGE_KEY
                        ),
                    })
                    .then(tokenResponse => {
                        if (tokenResponse.status === 200) {
                            saveToLocalStorage(
                                ACCESS_TOKEN_LOCAL_STORAGE_KEY,
                                tokenResponse.data.access
                            );
                            config.headers['Authorization'] =
                                'Bearer ' + tokenResponse.data.access;
                            return authenticated(config);
                        }
                    })
                    .catch(() => {
                        router.push(`${EASY_ERP_LOGIN_URL}`);
                    });
            } else {
                return Promise.reject(error);
            }
        }
    );
    return { authAxios: authenticated, publicAxios: unauthenticated };
}
