type SellingArticle = {
    barcode?: string;
    name?: string;
    quantity?: Number;
};
export default function ArticleSellRow({
    sellingArticle,
}: {
    sellingArticle: SellingArticle;
}) {
    return (
        <div className="flex px-4 py-2 bg-zinc-200 rounded-lg justify-start items-center h-16 mt-5">
            <div className="basis-6/12 font-bold">{sellingArticle.name}</div>
            <div className="basis-6/12">
                Quantità:{' '}
                <span className="font-bold">
                    {sellingArticle.quantity!.toString()}
                </span>
            </div>
        </div>
    );
}
