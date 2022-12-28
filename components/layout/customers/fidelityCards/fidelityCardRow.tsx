import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

type FidelityCard = {
    barcode?: string;
    is_active?: boolean;
};
export default function FidelityCardRow({
    fidelityCard,
    editFidelityCard,
}: {
    fidelityCard: FidelityCard;
    editFidelityCard: Function;
}) {
    return (
        <div className="flex px-2 py-2 bg-zinc-200 rounded-lg justify-start items-center h-16 mt-3">
            <div className="flex basis-11/12 justify-start items-center px-4 h-full">
                <div className="basis-7/12">
                    Identificativo tessera:{' '}
                    <span className="font-bold">{fidelityCard.barcode}</span>
                </div>
                <div className="basis-3/12">
                    {fidelityCard.is_active ? 'Attiva' : 'Inattiva'}
                </div>
            </div>
            <div className="flex basis-1/12 items-center justify-end h-full">
                <FontAwesomeIcon
                    className="mx-2 fa-lg cursor-pointer"
                    icon={faEdit}
                    title="Modifica tessera"
                    onClick={() => {
                        editFidelityCard(fidelityCard.barcode);
                    }}
                ></FontAwesomeIcon>
            </div>
        </div>
    );
}
