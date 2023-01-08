import useApi from '../../../useApi';
import Modal from '../../modal';
import clsx from 'clsx';
import React, { ChangeEvent, useState } from 'react';
import {
    TransactionArticle,
    TransactionReference,
} from '../../../../utils/types';
import {
    EASY_ERP_ARTICLES_URL,
    EASY_ERP_TRANSACTIONS_URL,
} from '../../../../utils/urls';
import toast from 'react-hot-toast';
import { useAuth } from '../../../useAuth';
import useTranslation from '../../../useTranslation';

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
    const { t } = useTranslation();

    const [articlesToBeTransacted, setArticlesToBeTransacted] = useState<
        TransactionArticle[]
    >([]);
    const [lastTransactionArticle, setLastTransactionArticle] = useState('');

    const closeModal = function (refresh: boolean) {
        onClose(refresh);
    };

    const rollbackChanges = function () {
        setArticlesToBeTransacted([]);
        setLastTransactionArticle('');
    };

    const updateArticleToBeTransacted = function (
        barcode: string,
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: string
    ) {
        const newArticle = articlesToBeTransacted.map(article => {
            if (article.barcode === barcode) {
                return { ...article, [field]: e.target.value };
            }
            return article;
        });
        setArticlesToBeTransacted(newArticle);
    };

    const saveTransaction = async function () {
        let transactionDetails: {
            article: string | undefined;
            quantity: number | undefined;
            reference: number | undefined;
        }[] = [];
        articlesToBeTransacted.forEach(articleToBeTransacted => {
            transactionDetails.push({
                article: articleToBeTransacted.barcode,
                quantity: articleToBeTransacted.quantity,
                reference: articleToBeTransacted.transaction_reference,
            });
        });

        api.authAxios
            .post(`${EASY_ERP_TRANSACTIONS_URL}/-1`, {
                details: transactionDetails,
            })
            .then(() => {
                toast.success('Transaction created succesfully');
                rollbackChanges();
                closeModal(true);
            })
            .catch(() => {
                toast.error('Error wile creating transaction');
            });
    };

    const manageArticle = function () {
        if (lastTransactionArticle !== '') {
            api.authAxios
                .get(`${EASY_ERP_ARTICLES_URL}/${lastTransactionArticle}`)
                .then(response => {
                    if (
                        articlesToBeTransacted.filter(article => {
                            return article.barcode === response.data.barcode;
                        }).length > 0
                    ) {
                        toast.error('Article already added to transaction!');
                    } else {
                        setArticlesToBeTransacted(prevState => [
                            ...prevState,
                            response.data,
                        ]);
                    }
                    setLastTransactionArticle('');
                })
                .catch(() => {
                    toast.error('Unable to retrieve article info');
                });
        }
    };

    return (
        <>
            <Modal
                title={t.warehouse.transactions.modal.title}
                isOpen={isOpen}
                onClose={() => {
                    rollbackChanges();
                    closeModal(false);
                }}
                width="w-fit"
            >
                <div className="w-[calc(100vw-25rem)]">
                    <div className="flex flex-col">
                        {articlesToBeTransacted.map(transactedArticle => (
                            <>
                                <div
                                    className="flex flex-row py-4 gap-2"
                                    key={transactedArticle.barcode}
                                >
                                    <input
                                        type="text"
                                        className="basis-4/12 cursor-pointer"
                                        readOnly
                                        value={transactedArticle.name}
                                    />
                                    <select
                                        className="basis-3/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md cursor-pointer"
                                        value={
                                            transactedArticle.transaction_reference
                                        }
                                        onChange={e => {
                                            updateArticleToBeTransacted(
                                                transactedArticle.barcode!,
                                                e,
                                                'transaction_reference'
                                            );
                                        }}
                                    >
                                        <option value="">
                                            {
                                                t.warehouse.transactions.modal
                                                    .selectReference
                                            }
                                        </option>
                                        {transactionReferences.map(
                                            transactionReference => (
                                                <option
                                                    key={transactionReference.id!.toString()}
                                                    value={transactionReference.id!.toString()}
                                                >
                                                    {
                                                        transactionReference.description
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>
                                    {transactedArticle.transaction_reference && (
                                        <>
                                            <div className="basis-3/12">
                                                <label htmlFor="articleQuantity">
                                                    {
                                                        t.warehouse.transactions
                                                            .modal.quantity
                                                    }
                                                </label>
                                                <input
                                                    id="articleQuantity"
                                                    type="number"
                                                    min={1}
                                                    className="border-2 border-solid rounded-md text-right ml-2"
                                                    value={
                                                        transactedArticle.quantity
                                                    }
                                                    onChange={e => {
                                                        updateArticleToBeTransacted(
                                                            transactedArticle.barcode!,
                                                            e,
                                                            'quantity'
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="basis-3/12">
                                                {`${t.warehouse.transactions.modal.available} `}
                                                <span className="font-bold">
                                                    {
                                                        transactedArticle.current_availability
                                                    }
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <hr />
                            </>
                        ))}
                    </div>
                    <div className="flex flex-row py-4">
                        <input
                            type="text"
                            value={lastTransactionArticle}
                            className="basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md"
                            onChange={e =>
                                setLastTransactionArticle(e.target.value)
                            }
                            onKeyDown={e => {
                                if (e.key == 'Enter') manageArticle();
                            }}
                        />
                    </div>
                    <hr />
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
                </div>
            </Modal>
        </>
    );
}
