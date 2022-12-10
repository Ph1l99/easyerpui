import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type Repair = {
    barcode?: string;
    title?: string;
    description?: string;
    delivery_date?: Date;
    customer?: string;
    customer_phone?: string;
    status?: number; // todo
    insert_date_time?: Date;
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
                <div className="basis-4/12 font-light text-sm overflow-hidden">
                    {repair.status}
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
                    onClick={() => deleteRepair(repair.barcode)}
                ></FontAwesomeIcon>
            </div>
        </div>
    );
}
