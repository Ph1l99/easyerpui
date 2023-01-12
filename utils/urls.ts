const EASY_ERP_BASE_URL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000/api'
        : 'http://localhost:8000/api';

// Base urls
const EASY_ERP_AUTH_BASE_URL = '/auth';
const EASY_ERP_WAREHOUSE_BASE_URL = '/warehouse';
const EASY_ERP_REPAIRS_BASE_URL = '/repairs';
const EASY_ERP_CUSTOMERS_BASE_URL = '/customers';
const EASY_ERP_SELLING_BASE_URL = '/selling';

// Authentication
const EASY_ERP_LOGIN_URL = EASY_ERP_AUTH_BASE_URL + '/login';
const EASY_ERP_SIGNUP_URL = EASY_ERP_AUTH_BASE_URL + '/signup';
const EASY_ERP_PROFILE_URL = EASY_ERP_AUTH_BASE_URL + '/profile';
const EASY_ERP_PROFILE_PASSWORD_URL =
    EASY_ERP_AUTH_BASE_URL + EASY_ERP_PROFILE_URL + '/password';
const EASY_ERP_REFRESH_TOKEN_URL = EASY_ERP_AUTH_BASE_URL + '/token/refresh';

// Warehouse
const EASY_ERP_ARTICLES_URL = EASY_ERP_WAREHOUSE_BASE_URL + '/articles';
const EASY_ERP_INVENTORY_URL = EASY_ERP_WAREHOUSE_BASE_URL + '/inventory';
const EASY_ERP_TRANSACTIONS_URL = EASY_ERP_WAREHOUSE_BASE_URL + '/transactions';
const EASY_ERP_INVENTORY_CYCLE_URL = EASY_ERP_INVENTORY_URL + '/cycle';
const EASY_ERP_INVENTORY_CYCLE_NEXT_URL =
    EASY_ERP_INVENTORY_URL + '/cycle/next';
const EASY_ERP_TRANSACTION_REFERENCES_URL =
    EASY_ERP_TRANSACTIONS_URL + '/references';

// Repairs
const EASY_ERP_REPAIRS_URL = EASY_ERP_REPAIRS_BASE_URL + '/';
const EASY_ERP_REPAIR_STATUS_URL = EASY_ERP_REPAIRS_BASE_URL + '/status';

// Customers
const EASY_ERP_CUSTOMER_BASE_URL = EASY_ERP_CUSTOMERS_BASE_URL + '/customer';
const EASY_ERP_FIDELITY_CARD_BASE_URL =
    EASY_ERP_CUSTOMERS_BASE_URL + '/fidelityCards';

export {
    EASY_ERP_BASE_URL,
    EASY_ERP_REPAIRS_BASE_URL,
    EASY_ERP_SELLING_BASE_URL,
    EASY_ERP_LOGIN_URL,
    EASY_ERP_SIGNUP_URL,
    EASY_ERP_PROFILE_URL,
    EASY_ERP_PROFILE_PASSWORD_URL,
    EASY_ERP_REFRESH_TOKEN_URL,
    EASY_ERP_ARTICLES_URL,
    EASY_ERP_INVENTORY_URL,
    EASY_ERP_TRANSACTIONS_URL,
    EASY_ERP_INVENTORY_CYCLE_URL,
    EASY_ERP_INVENTORY_CYCLE_NEXT_URL,
    EASY_ERP_TRANSACTION_REFERENCES_URL,
    EASY_ERP_REPAIRS_URL,
    EASY_ERP_REPAIR_STATUS_URL,
    EASY_ERP_CUSTOMERS_BASE_URL,
    EASY_ERP_CUSTOMER_BASE_URL,
    EASY_ERP_FIDELITY_CARD_BASE_URL,
};
