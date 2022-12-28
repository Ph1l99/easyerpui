// Warehouse
type Article = {
    name?: string;
    description?: string;
    barcode?: string;
    is_active?: boolean;
    reorder_threshold?: number;
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
    current_availability?: Number;
};

// Selling
type SellingArticle = {
    barcode?: string;
    name?: string;
    quantity?: Number;
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
    TransactionReference,
    InventoryArticle,
    SellingArticle,
    Repair,
    Customer,
    FidelityCard,
};
