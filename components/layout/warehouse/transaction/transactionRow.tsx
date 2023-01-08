import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import useApi from '../../../useApi';
import { EASY_ERP_TRANSACTIONS_URL } from '../../../../utils/urls';
import toast from 'react-hot-toast';
import TransactionDetailRow from './transactionDetailRow';
import { Transaction } from '../../../../utils/types';
import useTranslation from '../../../useTranslation';

export default function TransactionRow({
    transaction,
}: {
    transaction: Transaction;
}) {
    const api = useApi();
    const { t } = useTranslation();

    const [transactionDetails, setTransactionDetails] = useState([
        {
            id: -1,
            quantity: 0,
            article: {},
            reference: {},
        },
    ]);
    const [isOpenTransactionDetails, setIsOpenTransactionDetails] =
        useState(false);

    const loadTransactionDetails = function () {
        api.authAxios
            .get(`${EASY_ERP_TRANSACTIONS_URL}/${transaction.id}/details`)
            .then(response => {
                setTransactionDetails(response.data);
            })
            .catch(() => {
                toast.error('Error while loading transaction details');
            });
    };
    return (
        <>
            <div className="flex px-2 py-2 bg-zinc-200 rounded-lg justify-start items-center h-16 mt-3">
                <FontAwesomeIcon
                    className="basis-1/12 cursor-pointer"
                    icon={
                        isOpenTransactionDetails
                            ? faChevronDown
                            : faChevronRight
                    }
                    size="lg"
                    onClick={() => {
                        setIsOpenTransactionDetails(!isOpenTransactionDetails);
                        if (
                            transactionDetails.length == 0 ||
                            transactionDetails[0].id === -1
                        ) {
                            loadTransactionDetails();
                        }
                    }}
                />
                <div className="basis-2/12">
                    Trans. {transaction.id!.toString()}
                </div>
                <div className="basis-6/12">
                    Data{' '}
                    <span className="font-bold">
                        {new Date(transaction.date_and_time!).toLocaleString()}
                    </span>
                </div>
                <div className="basis-4/12 font-light text-sm overflow-hidden">
                    Utente{' '}
                    <span className="font-bold">{transaction.username}</span>
                </div>
            </div>
            {isOpenTransactionDetails &&
                transactionDetails.map(transactionDetail => (
                    <TransactionDetailRow
                        key={transactionDetail.id}
                        transactionDetail={{
                            id: transactionDetail.id,
                            quantity: transactionDetail.quantity,
                            article: transactionDetail.article,
                            reference: transactionDetail.reference,
                        }}
                    />
                ))}
        </>
    );
}
