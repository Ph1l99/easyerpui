import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import useApi from '../../../useApi';
import { EASY_ERP_TRANSACTIONS_URL } from '../../../../utils/urls';
import toast from 'react-hot-toast';

type Transaction = {
    id?: Number;
    date_and_time?: string;
    username?: string;
};
export default function TransactionRow({
    transaction,
}: {
    transaction: Transaction;
}) {
    const api = useApi();
    const [transactionDetails, setTransactionDetails] = useState([]);
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
            <div className="flex px-2 py-2 bg-zinc-200 rounded-lg justify-start items-center h-16">
                <FontAwesomeIcon
                    className="basis-1/12 cursor-pointer"
                    icon={
                        isOpenTransactionDetails
                            ? faChevronDown
                            : faChevronRight
                    }
                    onClick={() => {
                        setIsOpenTransactionDetails(!isOpenTransactionDetails);
                        if (transactionDetails.length == 0) {
                            loadTransactionDetails();
                        }
                    }}
                ></FontAwesomeIcon>
                <div className="basis-2/12 text-center">
                    Trans. {transaction.id!.toString()}
                </div>
                <div className="basis-6/12">
                    Data{' '}
                    <span className="font-bold">
                        {transaction.date_and_time}
                    </span>
                </div>
                <div className="basis-4/12 font-light text-sm overflow-hidden">
                    Utente{' '}
                    <span className="font-bold">{transaction.username}</span>
                </div>
            </div>
        </>
    );
}
