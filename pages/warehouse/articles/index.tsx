import ArticleRow from '../../../components/layout/article/articleRow';
import { useRouter } from 'next/router';
import { EASY_ERP_ARTICLES_URL } from '../../../utils/urls';
import SearchAdd from '../../../components/layout/searchAdd';
import SectionTitle from '../../../components/layout/sectionTitle';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import useApi from '../../../components/useApi';

export default function Articles() {
    const router = useRouter();
    const api = useApi();

    const [articles, setArticles] = useState([]);

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

    useEffect(() => {
        api.authAxios
            .get(EASY_ERP_ARTICLES_URL)
            .then(response => setArticles(response.data.results));
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
            {articles.map((article: any) => (
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
        </>
    );
}
