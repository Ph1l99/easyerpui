export const en = {
    home: {
        welcome: 'Welcome',
        repairs: 'Repairs',
        articles: 'Articles',
    },
    drawer: {
        home: 'Home',
        selling: 'Selling',
        repairs: 'Repairs',
        warehouse: {
            warehouse: 'Warehouse',
            inventory: 'Inventory',
            transactions: 'Transactions',
            articles: 'Articles',
        },
        customer: {
            customers: 'Customers',
            customerManagement: 'Customer manager',
            fidelityCards: 'Fidelity cards',
        },
    },
    header: {
        profile: {
            logout: 'Logout',
        },
    },
    auth: {
        login: {
            pageTitle: 'Login',
            email: 'Email',
            password: 'Password',
            login: 'Login',
            signupMessage: "You don't have an account?",
            signup: 'Signup!',
            api: {
                loginError: 'Error during login',
            },
        },
        signup: {
            pageTitle: 'Signup',
            firstName: 'First name',
            lastName: 'Last name',
            username: 'Username',
            email: 'Email',
            password: 'Password',
            signup: 'Signup',
            api: {
                signupError: 'Error during signup to EasyErp',
            },
        },
    },
    customers: {
        customer: {
            pageTitle: 'Customers',
            buttonAdd: 'New customer',
            row: {
                fidelityCard: 'Fidelity card',
                deleteButton: 'Delete customer',
            },
            detail: {
                pageTitle: {
                    customer: 'Customer',
                    newCustomer: 'New customer',
                },
                firstName: 'First name',
                lastName: 'Last name',
                phone: 'Phone',
                fidelityCard: 'Fidelity card',
                assignFidelityCard: 'Assign new fidelity card',
                newFidelityCard: 'New fidelity card',
                selectNewFidelityCard: 'Select new fidelity card',
                api: {
                    createCustomerSuccess: '',
                    createCustomerError: '',
                    updateCustomerSuccess: '',
                    updateCustomerError: '',
                    getFidelityCardError: 'Error while loading fidelity cards',
                    getCustomerInfoError: '',
                },
            },
            api: {
                deleteCustomerSuccess: 'Deleted customer',
                deleteCustomerError: 'Error while deleting customer',
                getCustomersError: 'Error while loading customers',
            },
        },
        fidelityCards: {
            pageTitle: 'Fidelity cards',
            buttonAdd: 'New fidelity card',
            filter: {
                title: 'Filter',
            },
            row: {
                cardIdentifier: 'Card identifier',
                status: {
                    active: 'Active',
                    inactive: 'Inactive',
                },
                editButton: 'Edit card',
            },
            modal: {
                title: {
                    newFidelityCard: 'Add new fidelity card',
                    fidelityCard: 'Fidelity card number',
                },
                barcode: 'Barcode',
                active: 'Active',
            },
        },
    },
    repairs: {
        pageTitle: 'Repairs',
        buttonAdd: 'New repair',
        filter: {
            title: 'Filter',
        },
        row: {
            delivery: 'Delivery',
            deleteButton: 'Delete repair',
        },
        detail: {
            pageTitle: {
                newRepair: 'New repair',
                repair: 'Repair',
            },
            print: {
                receipt: 'Print receipt',
                label: 'Print label',
            },
            title: 'Title',
            description: 'Description',
            deliveryDate: 'Delivery date',
            status: 'Select status',
            customer: 'Customer',
            customerPhone: 'Phone',
        },
        modal: {
            title: {
                newCustomer: 'Assign new customer to repair',
                editCustomer: 'Edit repair customer',
            },
            selectedCustomer: 'Selected customer',
            selectCustomer: 'Select',
        },
    },
    selling: {
        pageTitle: 'Selling',
        buttons: {
            save: 'Save selling',
            cancel: 'Cancel selling',
        },
        row: {
            quantity: 'Quantity',
        },
    },
    warehouse: {
        articles: {
            pageTitle: 'Articles',
            buttonAdd: 'New article',
            filter: {
                filter: 'Filter',
            },
            row: {
                print: {
                    label: 'Print label',
                },
            },
            detail: {
                pageTitle: {
                    newArticle: 'New article',
                    article: 'Article',
                },
                print: {
                    label: 'Print label',
                },
                title: 'Title',
                description: 'Description',
                barcode: 'Barcode',
                active: 'Active',
                reorderThreshold: 'Reorder threshold',
            },
        },
        inventory: {
            pageTitle: 'Inventory',
            buttonCycle: {
                title: 'Execute inventory cycle',
                lastCycle: 'Last inventory cycle',
                nextCycle: 'Next inventory cycle',
            },
            row: {
                currentAvailability: 'Current availability',
            },
        },
        transactions: {
            pageTitle: 'Transactions',
            buttonAdd: 'New transaction',
            row: {
                transaction: 'Trans.',
                date: 'Date',
                username: 'User',
                detailRow: {
                    quantity: 'Quantity',
                    reference: 'Reference',
                },
            },
            modal: {
                title: 'New transaction',
                selectReference: 'Select reference',
                quantity: 'Quantity',
                available: 'Available',
            },
        },
    },
    genericComponents: {
        buttons: {
            save: 'Save',
            cancel: 'Cancel',
        },
    },
};
