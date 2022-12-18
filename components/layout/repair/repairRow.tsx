import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

type Repair = {
    barcode?: string;
    title?: string;
    description?: string;
    delivery_date?: Date;
    status?: {
        id?: number;
        status?: string;
        is_active?: boolean;
        class_name?: string;
    };
};
export default function RepairRow({
    repair,
    navigateToRepairPage,
    deleteRepair,
}: {
    repair: Repair;
    navigateToRepairPage: Function;
    deleteRepair: Function;
}) {
    return (
        <div
            className="flex px-2 py-2 bg-zinc-200 rounded-lg justify-start items-center cursor-pointer h-16"
            onClick={() => navigateToRepairPage(repair.barcode)}
        >
            <div className="flex basis-11/12 justify-start items-center px-4 h-full">
                <div className="basis-5/12 font-bold">{repair.title}</div>
                <div className="basis-4/12">
                    <div
                        className={clsx(
                            'w-6/12 font-bold text-white text-center rounded-lg capitalize',
                            repair.status?.class_name
                                ? repair.status.class_name
                                : 'bg-sky-900'
                        )}
                    >
                        {repair.status?.status}
                    </div>
                </div>
                <div className="basis-3/12 font-bold">
                    <span className="font-normal">Consegna: </span>
                    {repair.delivery_date?.toLocaleDateString()}
                </div>
            </div>
            <div className="flex basis-1/12 items-center justify-end h-full">
                <FontAwesomeIcon
                    className="mx-2 fa-lg text-red-600"
                    icon={faTrash}
                    title="Elimina riparazione"
                    onClick={e => {
                        e.stopPropagation();
                        deleteRepair(repair.barcode);
                    }}
                ></FontAwesomeIcon>
            </div>
        </div>
    );
}
