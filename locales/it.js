export const it = {
    home: {
        welcome: 'Benvenuto',
        repairs: 'Riparazioni',
        articles: 'Articoli',
        api: {
            getArticleDashboardError:
                'Errore durante il recupero della dashboard articoli',
            getRepairDashboardError:
                'Errore durante il recupero della dashboard riparazioni',
        },
    },
    drawer: {
        home: 'Home',
        selling: 'Vendita',
        repairs: 'Riparazioni',
        warehouse: {
            warehouse: 'Magazzino',
            inventory: 'Inventario',
            transactions: 'Movimentazioni',
            articles: 'Articoli',
        },
        customer: {
            customers: 'Gestione clienti',
            customerManagement: 'Clienti',
            fidelityCards: 'Tessere fedeltà',
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
            signupMessage: 'Non hai un account?',
            signup: 'Registrati!',
            api: {
                loginError: "Errore durante l'accesso",
            },
        },
        signup: {
            pageTitle: 'Registrazione',
            firstName: 'Nome',
            lastName: 'Cognome',
            username: 'Username',
            email: 'Email',
            password: 'Password',
            signup: 'Registrami',
            api: {
                signupError: 'Errore durante la registrazione a EasyErp',
            },
        },
    },
    customers: {
        customer: {
            pageTitle: 'Clienti',
            buttonAdd: 'Nuovo cliente',
            row: {
                fidelityCard: 'Tessera fedeltà',
                deleteButton: 'Elimina cliente',
            },
            detail: {
                pageTitle: {
                    customer: 'Cliente',
                    newCustomer: 'Nuovo cliente',
                },
                firstName: 'Nome',
                lastName: 'Cognome',
                phone: 'Recapito',
                fidelityCard: 'Tessera fedeltà',
                assignFidelityCard: 'Assegna nuova tessera fedeltà',
                removeFidelityCard: 'Rimuovi assegnazione tessera fed.',
                newFidelityCard: 'Nuova tessera fedeltà',
                selectNewFidelityCard: 'Seleziona nuova tessera fedeltà',
                customerRepairs: 'Riparazioni associate al cliente',
                navigateToCustomerRepair: 'Apri riparazione',
                api: {
                    createCustomerSuccess: 'Cliente creato con successo',
                    createCustomerError:
                        'Errore durante la creazione del cliente',
                    updateCustomerSuccess: 'Cliente aggiornato con successo',
                    updateCustomerError:
                        "Errore durante l'aggiornamento del cliente",
                    getFidelityCardError:
                        'Errore durante il recupero delle tessere fedeltà',
                    getCustomerInfoError:
                        'Errore durante il recupero delle info cliente',
                },
            },
            api: {
                deleteCustomerSuccess: 'Cliente eliminato con successo',
                deleteCustomerError:
                    "Errore durante l'eliminazione del cliente",
                getCustomersError: 'Errore durante il caricamento dei clienti',
            },
        },
        fidelityCards: {
            pageTitle: 'Tessere fedeltà',
            buttonAdd: 'Nuova tessera fedeltà',
            filter: {
                title: 'Filtra',
            },
            row: {
                cardIdentifier: 'Identificativo tessera',
                status: {
                    active: 'Attiva',
                    inactive: 'Inattiva',
                },
                editButton: 'Modifica tessera',
            },
            modal: {
                title: {
                    newFidelityCard: 'Aggiunta nuova tessera fedeltà',
                    fidelityCard: 'Numero tessera fedeltà',
                },
                barcode: 'Barcode',
                active: 'Attiva',
                api: {
                    createFidelityCardSuccess:
                        'Tessera fedeltà creata con successo',
                    createFidelityCardError:
                        'Errore durante la creazione della tessera fedeltà',
                    updateFidelityCardSuccess:
                        'Tessera fedeltà aggiornata con successo',
                    updateFidelityCardError:
                        "Errore durante l'aggiornamento della tessera fedeltà",
                },
            },
            api: {
                loadFidelityCardsError:
                    'Errore durante il recupero delle tessere fedeltà',
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
                getInventoryCycleError: 'Erroe while loading inventory cycle',
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
                    getTransactionDetailError: '',
                },
            },
            modal: {
                title: 'New transaction',
                selectReference: 'Select reference',
                quantity: 'Quantity',
                available: 'Available',
                articleAlreadyAddedMessage:
                    'Article already added to the transaction',
                api: {
                    getArticleError: 'Unable to retrieve article info',
                    createTransactionSuccess: '',
                    createTransactionError: '',
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
