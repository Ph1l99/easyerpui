export const en = {
    home: {
        welcome: 'Welcome',
        repairs: 'Repairs',
        articles: 'Articles',
        api: {
            getArticleDashboardError: 'Error while loading article dashboard',
            getRepairDashboardError: 'Error while loading repair dashboard',
        },
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
                removeFidelityCard: 'Unassign fidelity card',
                newFidelityCard: 'New fidelity card',
                selectNewFidelityCard: 'Select new fidelity card',
                customerRepairs: 'Repairs associated to customer',
                navigateToCustomerRepair: 'Open repair',
                api: {
                    createCustomerSuccess: 'Customer created',
                    createCustomerError: 'Error during customer creation',
                    updateCustomerSuccess: 'Customer updated',
                    updateCustomerError: 'Error during customer update',
                    getFidelityCardError: 'Error while loading fidelity cards',
                    getCustomerInfoError: 'Error while loading customer info',
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
                api: {
                    createFidelityCardSuccess: 'Fidelity card created',
                    createFidelityCardError:
                        'Error while creating fidelity card',
                    updateFidelityCardSuccess: 'Fidelity card updated',
                    updateFidelityCardError:
                        'Error while updating fidelity card',
                },
            },
            api: {
                loadFidelityCardsError: 'Error while loading fidelity cards',
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
            api: {
                printReceiptSuccess: 'Receipt printed',
                printReceiptError: 'Error while printing receipt',
                printLabelSuccess: 'Label printed',
                printLabelError: 'Error while printing label',
                getRepairInfoError: 'Error while loading repair',
                getRepairStatusError: 'Error while loading repair status',
                getRepairCustomerInfoError:
                    'Error while loading repair customer',
                createRepairSuccess: 'Repair created',
                createRepairError: 'Error while creating repair',
                updateRepairSuccess: 'Repair updated',
                updateRepairError: 'Error while updating repair',
            },
        },
        modal: {
            title: {
                newCustomer: 'Assign new customer to repair',
                editCustomer: 'Edit repair customer',
            },
            selectedCustomer: 'Selected customer',
            selectCustomer: 'Select',
            api: {
                getCustomersError: 'Error while loading customers',
            },
        },
        api: {
            getRepairError: 'Repair not found',
            getRepairStatusError: 'Error while loading repair status',
            getRepairsError: 'Error while loading repairs',
            deleteRepairSuccess: 'Repair deleted',
            deleteRepairError: 'Error while deleting repair',
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
        availabilityEqZeroMessage:
            'Reached maximum number of articles to be sold',
        maxArticlesMessage: 'Current availability equal to 0',
        api: {
            createSellingTransactionSuccess:
                'Selling transaction correctly registered',
            createSellingTransactionError:
                'Error while processing selling transaction',
            getArticleNotFound: 'Article not found',
            getArticleError: 'Error while loading article',
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
                api: {
                    getArticleError: 'Error while loading article',
                    printLabelError: 'Error while printing label',
                    printLabelSuccess: 'Label printed',
                    createArticleSuccess: 'Article created',
                    createArticleError: 'Error while creating article',
                    updateArticleSuccess: 'Article updated',
                    updateArticleError: 'Error while updating article',
                },
            },
            api: {
                getArticlesError: 'Error while loading articles',
                printLabelError: 'Error while printing label',
                printLabelSuccess: 'Label printed',
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
            api: {
                getInventoryCycleError: 'Error while loading inventory cycle',
                getInventoryError: 'Error while loading inventory',
                createInventoryCycleSuccess: 'Inventory cycle created',
                createInventoryCycleError:
                    'Error while creating inventory cycle',
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
                api: {
                    getTransactionDetailError:
                        'Error while loading transaction details',
                },
            },
            modal: {
                title: 'New transaction',
                selectReference: 'Select reference',
                quantity: 'Quantity',
                available: 'Available',
                saveTransaction: 'Save transaction',
                printLabels: 'Print labels for articles being loaded',
                articleAlreadyAddedMessage:
                    'Article already added to the transaction',
                api: {
                    getArticleError: 'Unable to retrieve article info',
                    createTransactionSuccess: 'Transaction created',
                    createTransactionError: 'Error while creating transaction',
                },
            },
            api: {
                getTransactionsError: 'Error while loading transactions',
                getTransactionReferenceError:
                    'Error while loading transaction references',
            },
        },
    },
    genericComponents: {
        buttons: {
            save: 'Save',
            cancel: 'Cancel',
        },
        pagination: {
            nextPage: 'Next page',
            previousPage: 'Previous page',
            noResults: 'No results to display',
        },
    },
};
