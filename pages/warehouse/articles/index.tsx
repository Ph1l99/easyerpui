import ArticleRow from '../../../components/layout/article/articleRow';
import { useRouter } from 'next/router';
import { EASY_ERP_ARTICLE_URL } from '../../../utils/urls';
import SearchAdd from '../../../components/layout/searchAdd';
import SectionTitle from '../../../components/layout/sectionTitle';

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
            <SectionTitle title="Articoli"></SectionTitle>
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
