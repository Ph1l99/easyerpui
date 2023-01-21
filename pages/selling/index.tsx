import SectionTitle from '../../components/layout/sectionTitle';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import useApi from '../../components/useApi';
import {
    EASY_ERP_ARTICLES_URL,
    EASY_ERP_TRANSACTIONS_URL,
} from '../../utils/urls';
import toast from 'react-hot-toast';
import ArticleSellRow from '../../components/layout/selling/articleSellRow';
import { TRANSACTION_REFERENCE_ID_SELLING_TO_CUSTOMER } from '../../utils/constants';
import useTranslation from '../../components/useTranslation';
import {
    toastOnErrorApiResponse,
    toastOnSuccessApiResponse,
} from '../../utils/toast';

export default function Selling() {
    const { authAxios } = useApi();
    const { t } = useTranslation();

    const [currentArticle, setCurrentArticle] = useState('');
    const [isEnabledSellButton, setIsEnabledSellButton] = useState(false);
    const [articlesToBeSold, setArticlesToBeSold] = useState([
        {
            barcode: '',
            name: '',
            quantity: 0,
        },
    ]);

    const manageArticle = function () {
        if (currentArticle !== '') {
            authAxios
                .get(`${EASY_ERP_ARTICLES_URL}/${currentArticle}`)
                .then(response => {
                    // Check if current availability is gt 0
                    if (response.data.current_availability > 0) {
                        // Initialize object
                        let sellingArticle = {
                            quantity: 0,
                            name: '',
                            barcode: '',
                        };
                        // Check if current article already exists in the array
                        const alreadyExistingArticleIndex = getArticleIndex(
                            response.data.barcode
                        );
                        // If exists I update the quantity
                        if (alreadyExistingArticleIndex > -1) {
                            if (
                                articlesToBeSold[alreadyExistingArticleIndex]
                                    .quantity +
                                    1 <=
                                response.data.current_availability
                            ) {
                                // Create object
                                sellingArticle = {
                                    barcode: response.data.barcode,
                                    name: response.data.name,
                                    quantity:
                                        articlesToBeSold[
                                            alreadyExistingArticleIndex
                                        ].quantity + 1,
                                };
                                // Finally the article is pushed to the list
                                pushArticleToList(sellingArticle);
                            } else {
                                toast.error(t.selling.maxArticlesMessage);
                            }
                        } else {
                            // Otherwise I set it to 1
                            sellingArticle = {
                                barcode: response.data.barcode,
                                name: response.data.name,
                                quantity: 1,
                            };
                            // Finally the article is pushed to the list
                            pushArticleToList(sellingArticle);
                        }
                    } else {
                        toast.error(t.selling.availabilityEqZeroMessage);
                    }
                })
                .catch(error => {
                    if (error.statusCode == 404) {
                        toastOnErrorApiResponse(
                            error,
                            t.selling.api.getArticleNotFound
                        );
                    } else {
                        toastOnErrorApiResponse(
                            error,
                            t.selling.api.getArticleError
                        );
                    }
                });
        }
        setCurrentArticle('');
    };

    const pushArticleToList = function (article: any) {
        // Remove current article if exists (used for quantity > 1 for same article)
        setArticlesToBeSold(
            articlesToBeSold.filter(articleToBeSold => {
                return articleToBeSold.barcode !== article.barcode;
            })
        );
        // If I am considering the first item, the skeleton item is popped from the array
        if (articlesToBeSold.length == 1 && articlesToBeSold[0].barcode == '') {
            setArticlesToBeSold([article]);
        } else {
            setArticlesToBeSold(prevState => [...prevState, article]);
        }
    };

    const getArticleIndex = function (barcodeToBeChecked: string) {
        return articlesToBeSold.findIndex(article => {
            return article.barcode === barcodeToBeChecked;
        });
    };

    const rollbackSelling = function () {
        setArticlesToBeSold([]);
        setCurrentArticle('');
        setIsEnabledSellButton(false);
    };

    const sellItems = async function () {
        let sellTransactionDetails: {
            article: string;
            quantity: number;
            reference: number;
        }[] = [];
        if (articlesToBeSold.length > 0) {
            articlesToBeSold.forEach(item => {
                sellTransactionDetails.push({
                    article: item.barcode,
                    quantity: item.quantity,
                    reference: TRANSACTION_REFERENCE_ID_SELLING_TO_CUSTOMER,
                });
            });
            authAxios
                .post(`${EASY_ERP_TRANSACTIONS_URL}/-1`, {
                    details: sellTransactionDetails,
                    print_labels: false,
                })
                .then(response => {
                    toastOnSuccessApiResponse(
                        response,
                        t.selling.api.createSellingTransactionSuccess
                    );
                    rollbackSelling();
                })
                .catch(error => {
                    toastOnErrorApiResponse(
                        error,
                        t.selling.api.createSellingTransactionError
                    );
                });
        }
    };

    useEffect(() => {
        setIsEnabledSellButton(
            articlesToBeSold.length > 0 && articlesToBeSold[0].barcode !== ''
        );
    }, [articlesToBeSold]);

    return (
        <>
            <Head>
                <title>{t.selling.pageTitle}</title>
            </Head>
            <SectionTitle title={t.selling.pageTitle} />
            {isEnabledSellButton && (
                <div className="flex justify-end -mt-5 py-4 gap-1.5">
                    <input
                        type="button"
                        className="p-2 rounded-lg bg-red-600 text-white outline-none h-fit text-center cursor-pointer font-bold"
                        value={t.selling.buttons.cancel}
                        onClick={rollbackSelling}
                    />
                    <input
                        type="button"
                        className="p-2 rounded-lg bg-indigo-600 text-white outline-none h-fit text-center cursor-pointer font-bold"
                        value={t.selling.buttons.save}
                        onClick={sellItems}
                    />
                </div>
            )}
            <input
                type="text"
                className="px-2 py-1 mt-5 bg-zinc-200 w-full rounded-md outline-none focus:outline focus:outline-offset-2 focus:outline-sky-900"
                value={currentArticle}
                autoFocus
                onChange={e => setCurrentArticle(e.target.value)}
                onKeyDown={e => {
                    if (e.key == 'Enter') manageArticle();
                }}
            />
            {articlesToBeSold.length > 0 &&
                articlesToBeSold[0].barcode !== '' &&
                articlesToBeSold.map(articleToBeSold => (
                    <ArticleSellRow
                        key={articleToBeSold.barcode}
                        sellingArticle={{
                            barcode: articleToBeSold.barcode,
                            name: articleToBeSold.name,
                            quantity: articleToBeSold.quantity,
                        }}
                    />
                ))}
        </>
    );
}
