import SectionTitle from '../../../components/layout/sectionTitle';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import SearchAdd from '../../../components/layout/appLayout/search/searchAdd';
import useApi from '../../../components/useApi';
import {
    EASY_ERP_TRANSACTION_REFERENCES_URL,
    EASY_ERP_TRANSACTIONS_URL,
} from '../../../utils/urls';
import toast from 'react-hot-toast';
import TransactionRow from '../../../components/layout/warehouse/transaction/transactionRow';
import NewTransactionModal from '../../../components/layout/warehouse/transaction/newTransactionModal';
import { PaginationResult, TransactionReference } from '../../../utils/types';
import PaginatedContent from '../../../components/layout/appLayout/pagination/paginatedContent';
import AddButton from '../../../components/layout/appLayout/search/addButton';

export default function Transactions() {
    const api = useApi();

    const [transactions, setTransactions] = useState<PaginationResult>();
    const [transactionReferences, setTransactionReferences] = useState<
        TransactionReference[]
    >([]);

    const [isOpenTransactionModal, setIsOpenTransactionModal] = useState(false);

    const searchTransaction = function () {};

    const addNewTransaction = function () {
        setIsOpenTransactionModal(true);
    };

    const loadTransactions = function (url: string) {
        api.authAxios
            .get(url)
            .then(response => {
                setTransactions(response.data);
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
        loadTransactions(`${EASY_ERP_TRANSACTIONS_URL}`);
    }, []);

    return (
        <>
            <Head>
                <title>Movimentazioni</title>
            </Head>
            <SectionTitle title="Movimentazioni" />
            <div className="flex justify-end h-7 mb-3">
                <AddButton
                    addItem={addNewTransaction}
                    buttonTitle="Nuova movimentazione"
                />
            </div>

            <PaginatedContent
                next={transactions?.next}
                previous={transactions?.previous}
                loadItems={loadTransactions}
            >
                {transactions?.results?.map(transaction => (
                    <TransactionRow
                        key={transaction.id}
                        transaction={{
                            id: transaction.id,
                            date_and_time: transaction.date_and_time,
                            username: transaction.username,
                        }}
                    />
                ))}
            </PaginatedContent>

            <NewTransactionModal
                isOpen={isOpenTransactionModal}
                onClose={(refresh: boolean) => {
                    setIsOpenTransactionModal(false);
                    if (refresh)
                        loadTransactions(`${EASY_ERP_TRANSACTIONS_URL}`);
                }}
                transactionReferences={transactionReferences}
            />
        </>
    );
}
