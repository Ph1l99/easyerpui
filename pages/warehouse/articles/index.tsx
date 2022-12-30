import ArticleRow from '../../../components/layout/warehouse/article/articleRow';
import { useRouter } from 'next/router';
import { EASY_ERP_ARTICLES_URL } from '../../../utils/urls';
import SearchAdd from '../../../components/layout/searchAdd';
import SectionTitle from '../../../components/layout/sectionTitle';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import useApi from '../../../components/useApi';
import toast from 'react-hot-toast';
import PaginatedContent from '../../../components/layout/pagination/paginatedContent';
import { PaginationResult } from '../../../utils/types';

export default function Articles() {
    const router = useRouter();
    const api = useApi();

    const [articles, setArticles] = useState<PaginationResult>();

    const navigateToArticlePage = function (barcode: string) {
        if (barcode) router.push(`${EASY_ERP_ARTICLES_URL}/${barcode}`);
    };
    const printArticleLabel = function (barcode: string) {
        if (barcode) console.log('PRINTING BARCODE: ', barcode); //todo
    };
    const openNewArticlePage = function () {
        navigateToArticlePage('-1');
    };
    const searchArticle = function (input: string) {
        console.log('Searching ', input); // todo
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
            />
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
