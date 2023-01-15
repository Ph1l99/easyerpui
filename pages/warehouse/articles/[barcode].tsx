import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import useApi from '../../../components/useApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { EASY_ERP_ARTICLES_URL } from '../../../utils/urls';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { ArticleDetail } from '../../../utils/types';
import useTranslation from '../../../components/useTranslation';
import {
    toastOnErrorApiResponse,
    toastOnSuccessApiResponse,
} from '../../../utils/toast';

export default function Article() {
    const router = useRouter();
    const { authAxios } = useApi();
    const { t } = useTranslation();
    const { barcode } = router.query;

    const [article, setArticle] = useState<ArticleDetail>({});
    const [beforeUpdateArticle, setBeforeUpdateArticle] =
        useState<ArticleDetail>(article);
    const [isEditing, setIsEditing] = useState(false);
    const [isNewArticle, setIsNewArticle] = useState(false);

    const changeFormValue = function (
        e: ChangeEvent<HTMLInputElement>,
        field: string
    ) {
        setIsEditing(true);

        setArticle(prevState => ({
            ...prevState,
            [field]: field === 'is_active' ? e.target.checked : e.target.value,
        }));
    };

    const saveArticle = function () {
        isNewArticle ? createArticle() : updateArticle();
    };

    const updateArticle = function () {
        authAxios
            .put(`${EASY_ERP_ARTICLES_URL}/${barcode}`, article)
            .then(response => {
                toastOnSuccessApiResponse(
                    response,
                    t.warehouse.articles.detail.api.updateArticleSuccess
                );
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.warehouse.articles.detail.api.updateArticleError
                );
            });
    };

    const createArticle = function () {
        let articleToBeSaved = article;
        // If new article and no barcode is provided, set barcode to -1
        if (!article.barcode) {
            articleToBeSaved.barcode = '-1';
        }

        authAxios
            .post(`${EASY_ERP_ARTICLES_URL}/-1`, articleToBeSaved)
            .then(response => {
                toastOnSuccessApiResponse(
                    response,
                    t.warehouse.articles.detail.api.createArticleSuccess
                );
                router.replace(
                    `${EASY_ERP_ARTICLES_URL}/${response.data.barcode}`
                );
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.warehouse.articles.detail.api.createArticleError
                );
            });
    };

    const revertChanges = function () {
        setArticle(beforeUpdateArticle);
        setIsEditing(false);
    };

    const printArticleLabel = function () {
        if (barcode !== '-1') {
            authAxios
                .post(`${EASY_ERP_ARTICLES_URL}/${barcode}/label`)
                .then(response => {
                    toastOnSuccessApiResponse(
                        response,
                        t.warehouse.articles.detail.api.printLabelSuccess
                    );
                })
                .catch(error => {
                    toastOnErrorApiResponse(
                        error,
                        t.warehouse.articles.detail.api.printLabelError
                    );
                });
        }
    };

    useEffect(() => {
        setIsEditing(false);
        if (barcode === '-1') {
            setIsNewArticle(true);
        } else if (barcode !== undefined) {
            setIsNewArticle(false);
            authAxios
                .get(`${EASY_ERP_ARTICLES_URL}/${barcode}`)
                .then(response => {
                    setArticle(response.data);
                    setBeforeUpdateArticle(response.data);
                })
                .catch(error => {
                    toastOnErrorApiResponse(
                        error,
                        t.warehouse.articles.detail.api.getArticleError
                    );
                });
        }
    }, [barcode]);

    return (
        <>
            <Head>
                <title>
                    {isNewArticle
                        ? `${t.warehouse.articles.detail.pageTitle.newArticle}`
                        : `${t.warehouse.articles.detail.pageTitle.article}: ${barcode}`}
                </title>
            </Head>
            <div className="flex flex-col p-8 h-full">
                <div className="basis-1 /12 font-bold text-xl">
                    {`${t.warehouse.articles.detail.pageTitle.article}: `}
                    {isNewArticle ? '-' : `${barcode}`}
                </div>

                <div className="basis-1/12 flex justify-end">
                    {isEditing && (
                        <>
                            <input
                                type="button"
                                value={t.genericComponents.buttons.save}
                                className="basis-1/12 py-1 rounded-lg bg-green-600 text-white outline-none mr-4 text-center h-fit cursor-pointer font-bold"
                                onClick={saveArticle}
                            />
                            <input
                                type="button"
                                value={t.genericComponents.buttons.cancel}
                                className="basis-1/12 py-1 rounded-lg bg-red-600 text-white outline-none text-center h-fit cursor-pointer font-bold"
                                onClick={revertChanges}
                            />
                        </>
                    )}
                </div>
                <div className="basis-1/12 text-right">
                    <FontAwesomeIcon
                        className={clsx(
                            'mx-2 fa-xl',
                            isNewArticle
                                ? 'cursor-not-allowed'
                                : 'cursor-pointer'
                        )}
                        icon={faTag}
                        title={t.warehouse.articles.detail.print.label}
                        onClick={printArticleLabel}
                    />
                </div>
                <div className="basis-9/12">
                    <input
                        type="text"
                        placeholder={t.warehouse.articles.detail.title}
                        className="bg-zinc-200 w-full outline-none p-2 placeholder-black align-middle rounded-md"
                        maxLength={100}
                        value={article.name}
                        onChange={e => changeFormValue(e, 'name')}
                    />
                    <input
                        type="text"
                        placeholder={t.warehouse.articles.detail.description}
                        className="mt-5 bg-zinc-200 w-full outline-none p-2 placeholder-black h-40 rounded-md"
                        maxLength={250}
                        value={article.description}
                        onChange={e => changeFormValue(e, 'description')}
                    />
                    <div className="flex mt-5 text-center items-center">
                        <input
                            type="text"
                            readOnly={!isNewArticle}
                            placeholder={t.warehouse.articles.detail.barcode}
                            className={clsx(
                                'basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md',
                                !isNewArticle ? 'cursor-not-allowed' : ''
                            )}
                            value={article.barcode}
                            onChange={e => changeFormValue(e, 'barcode')}
                        />
                        <div className="basis-4/12">
                            <label htmlFor="isActiveCheckbox" className="pr-2">
                                {t.warehouse.articles.detail.active}
                            </label>
                            <input
                                id="isActiveCheckbox"
                                type="checkbox"
                                checked={article.is_active}
                                onChange={e => changeFormValue(e, 'is_active')}
                            />
                        </div>
                        <div className="basis-4/12">
                            <label htmlFor="reorderThreshold" className="pr-2">
                                {t.warehouse.articles.detail.reorderThreshold}
                            </label>
                            <input
                                id="reorderThreshold"
                                type="number"
                                className="border-2 border-solid rounded-md text-right"
                                min="0"
                                value={article.reorder_threshold}
                                onChange={e =>
                                    changeFormValue(e, 'reorder_threshold')
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
