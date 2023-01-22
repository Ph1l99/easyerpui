import clsx from 'clsx';

export default function ArticleDashboardItem({
    label,
    value,
    isClickEnabled,
    openModalDetail,
}: {
    label: string;
    value: number;
    isClickEnabled: boolean;
    openModalDetail: Function;
}) {
    return (
        <div
            className={clsx(
                'bg-red-400 w-1/4 flex rounded-lg text-white text-xl uppercase justify-around p-2.5 h-fit',
                isClickEnabled ? 'cursor-pointer' : 'cursor-not-allowed'
            )}
            onClick={() => openModalDetail()}
        >
            <div className="font-bold">{value}</div>
            <div className="text-left">{label}</div>
        </div>
    );
}
