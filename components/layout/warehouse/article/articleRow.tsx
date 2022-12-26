import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';

type Article = {
    name?: string;
    description?: string;
    barcode?: string;
    is_active?: boolean;
    reorder_threshold?: number;
};
export default function ArticleRow({
    article,
    navigateToArticlePage,
    printArticleLabel,
}: {
    article: Article;
    navigateToArticlePage: Function;
    printArticleLabel: Function;
}) {
    return (
        <div
            className="flex px-2 py-2 bg-zinc-200 rounded-lg justify-start items-center cursor-pointer h-16 mt-3"
            onClick={() => navigateToArticlePage(article.barcode)}
        >
            <div className="flex basis-1/12 items-center h-full justify-center rounded-lg bg-white">
                <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>
            </div>
            <div className="flex basis-10/12 justify-start items-center px-4 h-full">
                <div className="basis-4/12 font-bold">{article.name}</div>
                <div className="basis-8/12 font-light text-sm overflow-hidden">
                    {article.description}
                </div>
            </div>
            <div className="flex basis-1/12 items-center justify-end h-full">
                <FontAwesomeIcon
                    className="mx-2 fa-lg"
                    icon={faTag}
                    title="Stampa etichetta"
                    onClick={e => {
                        e.stopPropagation();
                        printArticleLabel(article.barcode);
                    }}
                ></FontAwesomeIcon>
            </div>
        </div>
    );
}
