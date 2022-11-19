const EASY_ERP_BASE_URL =
    process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : '';
const ACCESS_TOKEN_LOCAL_STORAGE_KEY = 'access';
const REFRESH_TOKEN_LOCAL_STORAGE_KEY = 'refresh';

export {
    EASY_ERP_BASE_URL,
    ACCESS_TOKEN_LOCAL_STORAGE_KEY,
    REFRESH_TOKEN_LOCAL_STORAGE_KEY,
};
