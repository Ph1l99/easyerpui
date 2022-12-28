import useApi from '../../../useApi';
import Modal from '../../modal';
import clsx from 'clsx';
import React from 'react';
import { TransactionReference } from '../../../../utils/types';

export default function NewTransactionModal({
    isOpen,
    onClose,
    transactionReferences,
}: {
    isOpen: boolean;
    onClose: Function;
    transactionReferences: Array<TransactionReference>;
}) {
    const api = useApi();

    const closeModal = function (refresh: boolean) {
        onClose(refresh);
    };

    const saveTransaction = function () {
        // todo
    };

    return (
        <>
            <Modal
                title="Nuova movimentazione"
                isOpen={isOpen}
                onClose={() => closeModal(false)}
            >
                <div></div>
                <hr className="mt-4" />
                <div className="flex flex-row justify-end mt-4">
                    <input
                        type="button"
                        value="Salva movimentazione"
                        className={clsx(
                            'py-1 px-1 rounded-lg bg-indigo-600 text-white outline-none mr-4 text-center h-fit font-bold cursor-pointer'
                        )}
                        onClick={saveTransaction}
                    />
                </div>
            </Modal>
        </>
    );
}
