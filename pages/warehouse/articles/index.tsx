import ArticleRow from '../../../components/layout/articleRow';
import { useRouter } from 'next/router';
import { EASY_ERP_ARTICLES_URL } from '../../../utils/urls';

export default function Articles() {
    const router = useRouter();
    const navigateToArticlePage = function (barcode: string) {
        if (barcode) router.push(EASY_ERP_ARTICLES_URL + '/' + barcode);
    };
    const printArticleLabel = function (barcode: string) {
        if (barcode) console.log('PRINTING BARCODE: ', barcode);
    };
    return (
        <>
            <p>Articles</p>
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
