import ArticleRow from '../../../components/articleRow';

export default function Articles() {
    const navigateToPage = function () {};
    return (
        <>
            <p>Articles</p>
            <ArticleRow
                article={{
                    name: 'PRODOTTO 1',
                    description: 'Lorem ipsum sit ciao',
                }}
                navigateToArticlePage={navigateToPage}
            ></ArticleRow>
        </>
    );
}
