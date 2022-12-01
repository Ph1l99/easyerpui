import ArticleRow from '../../../components/articleRow';

export default function Articles() {
    const navigateToPage = function (barcode: string) {
        console.log(barcode);
    };
    return (
        <>
            <p>Articles</p>
            <ArticleRow
                article={{
                    name: 'PRODOTTO 1',
                    description: 'Lorem ipsum sit ciao',
                    barcode: '123456E',
                }}
                navigateToArticlePage={navigateToPage}
            ></ArticleRow>
        </>
    );
}
