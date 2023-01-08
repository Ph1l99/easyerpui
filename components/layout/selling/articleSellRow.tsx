import { SellingArticle } from '../../../utils/types';
import useTranslation from '../../useTranslation';

export default function ArticleSellRow({
    sellingArticle,
}: {
    sellingArticle: SellingArticle;
}) {
    const { t } = useTranslation();
    return (
        <div className="flex px-4 py-2 bg-zinc-200 rounded-lg justify-start items-center h-16 mt-3">
            <div className="basis-6/12 font-bold">{sellingArticle.name}</div>
            <div className="basis-6/12">
                `${t.selling.row.quantity}: `
                <span className="font-bold">
                    {sellingArticle.quantity!.toString()}
                </span>
            </div>
        </div>
    );
}
