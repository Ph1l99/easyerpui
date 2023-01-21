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
        pageTitle: 'Riparazioni',
        buttonAdd: 'Nuova riparazione',
        filter: {
            title: 'Filtra',
        },
        row: {
            delivery: 'Consegna',
            deleteButton: 'Elimina riparazione',
        },
        detail: {
            pageTitle: {
                newRepair: 'Nuova riparazione',
                repair: 'Riparazione',
            },
            print: {
                receipt: 'Stampa ricevuta',
                label: 'Stampa etichetta',
            },
            title: 'Titolo',
            description: 'Descrizione',
            deliveryDate: 'Data di consegna',
            status: 'Seleziona uno stato',
            customer: 'Cliente',
            customerPhone: 'Recapito',
            api: {
                printReceiptSuccess: 'Ricevuta stampata con successo',
                printReceiptError: 'Errore durante la stampa della ricevuta',
                printLabelSuccess: 'Etichetta stampata con successo',
                printLabelError: "Errore durante la stampa dell'etichetta",
                getRepairInfoError:
                    'Errore durante il recupero della riparazione',
                getRepairStatusError:
                    'Errore durante il recupero degli stati riparazione',
                getRepairCustomerInfoError:
                    'Errore durante il recupero dei clienti',
                createRepairSuccess: 'Riparazione creata con successo',
                createRepairError:
                    'Errore durante la creazione della riparazione',
                updateRepairSuccess: 'Riparazione aggiornata con successo',
                updateRepairError:
                    "Errore durante l'aggiornamento della riparazione",
            },
        },
        modal: {
            title: {
                newCustomer: 'Assegna cliente riparazione',
                editCustomer: 'Modifica cliente riparazione',
            },
            selectedCustomer: 'Cliente selezionato',
            selectCustomer: 'Seleziona',
            api: {
                getCustomersError: 'Errore durante il recupero dei clienti',
            },
        },
        api: {
            getRepairError: 'Riparazione non trovata',
            getRepairStatusError:
                'Errore durante il recupero degli stati riparazione',
            getRepairsError: 'Errore durante il recupero delle riparazioni',
            deleteRepairSuccess: 'Riparazione eliminata con successo',
            deleteRepairError:
                "Errore durante l'eliminazione della riparazione",
        },
    },
    selling: {
        pageTitle: 'Vendita',
        buttons: {
            save: 'Chiudi vendita',
            cancel: 'Annulla vendita',
        },
        row: {
            quantity: 'Quantità',
        },
        availabilityEqZeroMessage:
            'Raggiunto numero massimo di parti scaricabili per articolo',
        maxArticlesMessage: 'Disponibilità residua pari a zero',
        api: {
            createSellingTransactionSuccess:
                'Movimentazione di vendita registrata con successo',
            createSellingTransactionError:
                "Errore durante l'elaborazione della transazione di vendita",
            getArticleNotFound: 'Articolo non trovato',
            getArticleError: "Errore durante il recupero dell'articolo",
        },
    },
    warehouse: {
        articles: {
            pageTitle: 'Articoli',
            buttonAdd: 'Nuovo articolo',
            filter: {
                filter: 'Filtra',
            },
            row: {
                print: {
                    label: 'Stampa etichetta',
                },
            },
            detail: {
                pageTitle: {
                    newArticle: 'Nuovo articolo',
                    article: 'Articolo',
                },
                print: {
                    label: 'Stampa etichetta',
                },
                title: 'Titolo',
                description: 'Descrizione',
                barcode: 'Barcode',
                active: 'Attivo',
                reorderThreshold: 'Soglia riordino',
                api: {
                    getArticleError: "Errore durante il recupero dell'articolo",
                    printLabelError: "Errore durante la stampa dell'etichetta",
                    printLabelSuccess: 'Etichetta stampata con successo',
                    createArticleSuccess: 'Articolo creato con successo',
                    createArticleError:
                        "Errore durante la creazione dell'articolo",
                    updateArticleSuccess: 'Articolo aggiornato con successo',
                    updateArticleError:
                        "Errore durante l'aggiornamento dell'articolo",
                },
            },
            api: {
                getArticlesError: 'Errore durante il recupero degli articoli',
                printLabelError: "Errore durante la stampa dell'etichetta",
                printLabelSuccess: 'Etichetta stampata con successo',
            },
        },
        inventory: {
            pageTitle: 'Inventario',
            buttonCycle: {
                title: 'Lancia valorizzazione storico magazzino',
                lastCycle: 'Data ultima valorizzazione',
                nextCycle: 'Data prossima valorizzazione',
            },
            row: {
                currentAvailability: 'Disponibilità attuale',
            },
            api: {
                getInventoryCycleError:
                    'Errore durante il recupero dei dettagli valorizzazione storico',
                getInventoryError: "Errore durante il recupero dell'inventario",
                createInventoryCycleSuccess:
                    'Valorizzazione storico creata con successo',
                createInventoryCycleError:
                    'Errore durante la creazione valorizzazione storico',
            },
        },
        transactions: {
            pageTitle: 'Movimentazioni',
            buttonAdd: 'Nuova movimentazione',
            row: {
                transaction: 'Mov.',
                date: 'Data',
                username: 'Utente',
                detailRow: {
                    quantity: 'Quantità',
                    reference: 'Causale',
                },
                api: {
                    getTransactionDetailError:
                        'Errore durante il recupero dei dettagli movimentazione',
                },
            },
            modal: {
                title: 'Nuova movimentazione',
                selectReference: 'Seleziona causale',
                quantity: 'Quantità',
                available: 'Disponibile',
                saveTransaction: 'Salva movimentazione',
                printLabels: 'Stampa etichette per articoli caricati',
                articleAlreadyAddedMessage:
                    'Articolo già aggiunto alla movimentazione',
                api: {
                    getArticleError:
                        'Impossibile recuperare i dettagli articolo',
                    createTransactionSuccess:
                        'Movimentazione creata con successo',
                    createTransactionError:
                        'Errore durante la creazione movimentazione',
                },
            },
            api: {
                getTransactionsError:
                    'Errore durante il recupero delle movimentazioni',
                getTransactionReferenceError:
                    'Errore durante il recupero delle causali movimentazioni',
            },
        },
    },
    genericComponents: {
        buttons: {
            save: 'Salva',
            cancel: 'Annulla',
        },
        pagination: {
            nextPage: 'Prossima pagina',
            previousPage: 'Pagina precedente',
            noResults: 'Nessun risultato',
        },
    },
};
