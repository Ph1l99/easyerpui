import SectionTitle from '../../../components/layout/sectionTitle';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import SearchAdd from '../../../components/layout/searchAdd';
import useApi from '../../../components/useApi';
import {
    EASY_ERP_TRANSACTION_REFERENCES_URL,
    EASY_ERP_TRANSACTIONS_URL,
} from '../../../utils/urls';
import toast from 'react-hot-toast';
import TransactionRow from '../../../components/layout/warehouse/transaction/transactionRow';
import NewTransactionModal from '../../../components/layout/warehouse/transaction/newTransactionModal';
import { TransactionReference } from '../../../utils/types';

export default function Transactions() {
    const api = useApi();

    const [transactions, setTransactions] = useState([
        {
            id: -1,
            date_and_time: '',
            username: '',
        },
    ]);
    const [transactionReferences, setTransactionReferences] = useState<
        TransactionReference[]
    >([]);

    const [isOpenTransactionModal, setIsOpenTransactionModal] = useState(false);

    const searchTransaction = function () {};

    const addNewTransaction = function () {
        setIsOpenTransactionModal(true);
    };

    const loadTransactions = function () {
        api.authAxios
            .get(`${EASY_ERP_TRANSACTIONS_URL}`)
            .then(response => {
                setTransactions(response.data.results);
            })
            .catch(() => {
                toast.error('Error while loading transactions');
            });
    };

    const loadTransactionReferences = function () {
        api.authAxios
            .get(`${EASY_ERP_TRANSACTION_REFERENCES_URL}`)
            .then(response => {
                setTransactionReferences(response.data);
            })
            .catch(() => {
                toast.error('Error while downloading transaction references');
            });
    };

    useEffect(() => {
        loadTransactionReferences();
        loadTransactions();
    }, []);
    return (
        <>
            <Head>
                <title>Movimentazioni</title>
            </Head>
            <SectionTitle title="Movimentazioni"></SectionTitle>
            <SearchAdd
                searchItem={searchTransaction}
                addItem={addNewTransaction}
            ></SearchAdd>
            <div className="h-[calc(100vh-18rem)] overflow-y-scroll">
                {transactions.map(transaction => (
                    <TransactionRow
                        key={transaction.id}
                        transaction={{
                            id: transaction.id,
                            date_and_time: transaction.date_and_time,
                            username: transaction.username,
                        }}
                    />
                ))}
            </div>

            <NewTransactionModal
                isOpen={isOpenTransactionModal}
                onClose={(refresh: boolean) => {
                    setIsOpenTransactionModal(false);
                    if (refresh) loadTransactions();
                }}
                transactionReferences={transactionReferences}
            />
        </>
    );
}
