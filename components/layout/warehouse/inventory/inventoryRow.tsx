type InventoryArticle = {
    barcode?: string;
    name?: string;
    current_availability?: Number;
};
export default function InventoryRow({
    inventoryArticle,
}: {
    inventoryArticle: InventoryArticle;
}) {
    return (
        <div className="flex px-4 py-2 bg-zinc-200 rounded-lg justify-start items-center h-16 mt-3">
            <div className="basis-6/12 font-bold">{inventoryArticle.name}</div>
            <div className="basis-6/12">
                Giacenza attuale:{' '}
                <span className="font-bold text-lg">
                    {inventoryArticle.current_availability!.toString()}
                </span>
            </div>
        </div>
    );
}
