import ArticleRow from '../../../components/layout/articleRow';
import { useRouter } from 'next/router';
import {
    EASY_ERP_ARTICLE_URL,
    EASY_ERP_ARTICLES_URL,
} from '../../../utils/urls';
import SearchAdd from '../../../components/layout/searchAdd';
import { func } from 'prop-types';

export default function Articles() {
    const router = useRouter();
    const navigateToArticlePage = function (barcode: string) {
        if (barcode)
            router.push(
                EASY_ERP_ARTICLE_URL.replace('{ARTICLE_BARCODE}', barcode)
            );
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

    return (
        <>
            <div className="px-2 py-4 font-bold text-xl">Articoli</div>
            <SearchAdd
                addItem={openNewArticlePage}
                searchItem={searchArticle}
            ></SearchAdd>
            <ArticleRow
                article={{
                    name: 'PRODOTTO 1',
                    description: 'Lorem ipsum sit ciao',
                    barcode: 'RTDZKZE8MBHVRUGYWWKABE94',
                }}
                navigateToArticlePage={navigateToArticlePage}
                printArticleLabel={printArticleLabel}
            ></ArticleRow>
        </>
    );
}
