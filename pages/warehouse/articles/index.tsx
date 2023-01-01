import ArticleRow from '../../../components/layout/warehouse/article/articleRow';
import { useRouter } from 'next/router';
import { EASY_ERP_ARTICLES_URL } from '../../../utils/urls';
import SearchAdd from '../../../components/layout/appLayout/search/searchAdd';
import SectionTitle from '../../../components/layout/sectionTitle';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import useApi from '../../../components/useApi';
import toast from 'react-hot-toast';
import PaginatedContent from '../../../components/layout/appLayout/pagination/paginatedContent';
import { PaginationResult } from '../../../utils/types';
import FilterBoxGroup from '../../../components/layout/appLayout/filtering/filterBoxGroup';

export default function Articles() {
    const router = useRouter();
    const api = useApi();

    const [articles, setArticles] = useState<PaginationResult>();
    const [articleFilters, setArticleFilters] = useState([
        {
            value: 'true',
            label: 'Attivi',
            color: 'pink-400',
        },
    ]);

    const navigateToArticlePage = function (barcode: string) {
        if (barcode) router.push(`${EASY_ERP_ARTICLES_URL}/${barcode}`);
    };
    const printArticleLabel = function (barcode: string) {
        if (barcode) {
            api.authAxios
                .post(`${EASY_ERP_ARTICLES_URL}/${barcode}/label`)
                .then(() => {
                    toast.success('Label printed succesfully');
                })
                .catch(() => {
                    toast.error('Error while printing label');
                });
        }
    };
    const openNewArticlePage = function () {
        navigateToArticlePage('-1');
    };
    const searchArticleFromFilters = function (values: Array<string>) {
        let url = values.join('&is_active=');

        if (values.length >= 1) {
            url = `?is_active=${url}`;
        }
        loadArticles(`${EASY_ERP_ARTICLES_URL}${url}`);
    };
    const searchArticle = function (input: string) {
        loadArticles(`${EASY_ERP_ARTICLES_URL}?search=${input}`);
    };

    const loadArticles = function (url: string) {
        api.authAxios
            .get(url)
            .then(response => setArticles(response.data))
            .catch(() => {
                toast.error('Error while loading articles');
            });
    };

    useEffect(() => {
        loadArticles(`${EASY_ERP_ARTICLES_URL}`);
    }, []);

    return (
        <>
            <Head>
                <title>Articoli</title>
            </Head>
            <SectionTitle title="Articoli" />
            <SearchAdd
                addItem={openNewArticlePage}
                searchItem={searchArticle}
                buttonTitle="Nuovo articolo"
            />
            <div className="flex gap-4 text-white">
                <span className="text-black font-semibold">Filtra per:</span>
                <FilterBoxGroup
                    items={articleFilters}
                    search={searchArticleFromFilters}
                />
            </div>
            <PaginatedContent
                next={articles?.next}
                previous={articles?.previous}
                loadItems={loadArticles}
            >
                {articles?.results!.map((article: any) => (
                    <ArticleRow
                        key={article.barcode}
                        article={{
                            name: article.name,
                            description: article.description,
                            barcode: article.barcode,
                        }}
                        navigateToArticlePage={navigateToArticlePage}
                        printArticleLabel={printArticleLabel}
                    />
                ))}
            </PaginatedContent>
        </>
    );
}
