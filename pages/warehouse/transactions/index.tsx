import SectionTitle from '../../../components/layout/sectionTitle';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import useApi from '../../../components/useApi';
import {
    EASY_ERP_TRANSACTION_REFERENCES_URL,
    EASY_ERP_TRANSACTIONS_URL,
} from '../../../utils/urls';
import TransactionRow from '../../../components/layout/warehouse/transaction/transactionRow';
import NewTransactionModal from '../../../components/layout/warehouse/transaction/newTransactionModal';
import { PaginationResult, TransactionReference } from '../../../utils/types';
import PaginatedContent from '../../../components/layout/appLayout/pagination/paginatedContent';
import AddButton from '../../../components/layout/appLayout/search/addButton';
import useTranslation from '../../../components/useTranslation';
import { toastOnErrorApiResponse } from '../../../utils/toast';

export default function Transactions() {
    const { authAxios } = useApi();
    const { t } = useTranslation();

    const [transactions, setTransactions] = useState<PaginationResult>();
    const [transactionReferences, setTransactionReferences] = useState<
        TransactionReference[]
    >([]);

    const [isOpenTransactionModal, setIsOpenTransactionModal] = useState(false);

    const addNewTransaction = function () {
        setIsOpenTransactionModal(true);
    };

    const loadTransactions = function (url: string) {
        authAxios
            .get(url)
            .then(response => {
                setTransactions(response.data);
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.warehouse.transactions.api.getTransactionsError
                );
            });
    };

    const loadTransactionReferences = function () {
        authAxios
            .get(`${EASY_ERP_TRANSACTION_REFERENCES_URL}`)
            .then(response => {
                setTransactionReferences(response.data);
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.warehouse.transactions.api.getTransactionReferenceError
                );
            });
    };

    useEffect(() => {
        loadTransactionReferences();
        loadTransactions(`${EASY_ERP_TRANSACTIONS_URL}`);
    }, []);

    return (
        <>
            <Head>
                <title>{t.warehouse.transactions.pageTitle}</title>
            </Head>
            <SectionTitle title={t.warehouse.transactions.pageTitle} />
            <div className="py-2 flex justify-end h-11 gap-1.5">
                <AddButton
                    addItem={addNewTransaction}
                    buttonTitle={t.warehouse.transactions.buttonAdd}
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
