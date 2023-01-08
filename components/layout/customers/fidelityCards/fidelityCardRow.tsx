import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FidelityCard } from '../../../../utils/types';
import useTranslation from '../../../useTranslation';

export default function FidelityCardRow({
    fidelityCard,
    editFidelityCard,
}: {
    fidelityCard: FidelityCard;
    editFidelityCard: Function;
}) {
    const { t } = useTranslation();
    return (
        <div className="flex px-2 py-2 bg-zinc-200 rounded-lg justify-start items-center h-16 mt-3">
            <div className="flex basis-11/12 justify-start items-center px-4 h-full">
                <div className="basis-7/12">
                    `${t.customers.fidelityCards.row.cardIdentifier}: `
                    <span className="font-bold">{fidelityCard.barcode}</span>
                </div>
                <div className="basis-3/12">
                    {fidelityCard.is_active
                        ? `${t.customers.fidelityCards.row.status.active}`
                        : `${t.customers.fidelityCards.row.status.inactive}`}
                </div>
            </div>
            <div className="flex basis-1/12 items-center justify-end h-full">
                <FontAwesomeIcon
                    className="mx-2 fa-lg cursor-pointer"
                    icon={faEdit}
                    title={t.customers.fidelityCards.row.editCardButton}
                    onClick={() => {
                        editFidelityCard(fidelityCard.barcode);
                    }}
                />
            </div>
        </div>
    );
}
