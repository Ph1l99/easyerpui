// Warehouse

type ArticleDetail = {
    name?: string;
    description?: string;
    barcode?: string;
    is_active?: boolean;
    reorder_threshold?: number;
    current_availability?: number;
};
type TransactionArticle = ArticleDetail & {
    quantity?: number;
    transaction_reference?: number;
};
type TransactionReference = {
    id?: Number;
    description?: string;
    operation_type?: string;
    is_active?: boolean;
};
type InventoryArticle = {
    barcode?: string;
    name?: string;
    current_availability?: number;
};
type ArticleDashboardDetail = {
    label?: string;
    value?: number;
};
type ArticleDashboard = {
    dashboard?: Array<ArticleDashboardDetail>;
};

// Selling
type SellingArticle = {
    barcode?: string;
    name?: string;
    quantity?: number;
};

// Repairs
type RepairDetail = {
    barcode?: string;
    title?: string;
    description?: string;
    delivery_date?: string;
    status?: RepairStatus;
};
type RepairStatus = {
    id?: number;
    status?: string;
    is_active?: boolean;
    class_name?: string;
};
type RepairDashboardDetail = {
    status_id?: number;
    status?: string;
    status_class?: string;
    total_repairs?: number;
};
type RepairDashboard = {
    dashboard?: Array<RepairDashboardDetail>;
};

// Customers
type ListCustomer = {
    id?: number;
    first_name?: string;
    last_name?: string;
    fidelity_card?: string;
};
type CustomerDetail = ListCustomer & {
    phone?: string;
};

type FidelityCard = {
    barcode?: string;
    is_active?: boolean;
};

type PaginationResult = {
    count?: number;
    next?: string;
    previous?: string;
    results?: Array<any>;
};

export type {
    ArticleDetail,
    TransactionArticle,
    TransactionReference,
    InventoryArticle,
    SellingArticle,
    ArticleDashboardDetail,
    ArticleDashboard,
    RepairDetail,
    RepairStatus,
    RepairDashboardDetail,
    RepairDashboard,
    ListCustomer,
    CustomerDetail,
    FidelityCard,
    PaginationResult,
};
