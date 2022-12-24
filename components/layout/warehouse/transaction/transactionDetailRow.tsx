import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

type TransactionDetail = {
    id?: Number;
    quantity?: Number;
    article?: {
        barcode?: '';
        description?: '';
    };
    reference?: {
        id?: Number;
        description?: '';
        operation_type?: '+';
    };
};
export default function TransactionDetailRow({
    transactionDetail,
}: {
    transactionDetail: TransactionDetail;
}) {
    return (
        <>
            <div className="flex px-2 py-2 bg-zinc-200 rounded-lg justify-start items-center h-16 mx-3 mt-2">
                <FontAwesomeIcon
                    className={clsx(
                        'basis-1/12 font-bold',
                        transactionDetail.reference?.operation_type === '+'
                            ? 'text-green-600'
                            : 'text-red-600'
                    )}
                    icon={
                        transactionDetail.reference?.operation_type === '+'
                            ? faPlus
                            : faMinus
                    }
                    size="lg"
                ></FontAwesomeIcon>
                <div className="basis-4/12">
                    {transactionDetail.article?.description}
                </div>
                <div className="basis-3/12">
                    Quantità{' '}
                    <span className="font-bold">
                        {transactionDetail.quantity?.toString()}
                    </span>
                </div>
                <div className="basis-4/12 font-light text-sm overflow-hidden">
                    Causale{' '}
                    <span className="font-bold">
                        {transactionDetail.reference?.description}
                    </span>
                </div>
            </div>
        </>
    );
}
