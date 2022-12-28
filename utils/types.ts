// Warehouse
import Article from '../pages/warehouse/articles/[barcode]';

type Article = {
    name?: string;
    description?: string;
    barcode?: string;
    is_active?: boolean;
    reorder_threshold?: number;
    current_availability?: number;
};
type TransactionArticle = Article & {
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

// Selling
type SellingArticle = {
    barcode?: string;
    name?: string;
    quantity?: number;
};

// Repairs
type Repair = {
    barcode?: string;
    title?: string;
    description?: string;
    delivery_date?: string;
    status?: {
        id?: number;
        status?: string;
        is_active?: boolean;
        class_name?: string;
    };
};

// Customers
type Customer = {
    id?: number;
    first_name?: string;
    last_name?: string;
    fidelity_card?: string;
};
type FidelityCard = {
    barcode?: string;
    is_active?: boolean;
};

export type {
    Article,
    TransactionArticle,
    TransactionReference,
    InventoryArticle,
    SellingArticle,
    Repair,
    Customer,
    FidelityCard,
};
