const EASY_ERP_BASE_URL =
    process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : '';

const EASY_ERP_AUTH_BASE_URL = EASY_ERP_BASE_URL + '/auth';

const EASY_ERP_LOGIN_URL = EASY_ERP_AUTH_BASE_URL + '/login';
const EASY_ERP_SIGNUP_URL = EASY_ERP_AUTH_BASE_URL + '/signup';
const EASY_ERP_PROFILE_URL = EASY_ERP_AUTH_BASE_URL + '/profile';
const EASY_ERP_PROFILE_PASSWORD_URL =
    EASY_ERP_AUTH_BASE_URL + '/profile/password';
const EASY_ERP_REFRESH_TOKEN_URL = EASY_ERP_AUTH_BASE_URL + '/token/refresh';

export {
    EASY_ERP_LOGIN_URL,
    EASY_ERP_SIGNUP_URL,
    EASY_ERP_PROFILE_URL,
    EASY_ERP_PROFILE_PASSWORD_URL,
    EASY_ERP_REFRESH_TOKEN_URL,
};
