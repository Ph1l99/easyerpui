import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ListCustomer } from '../../../../utils/types';
import useTranslation from '../../../useTranslation';

export default function CustomerRow({
    customer,
    navigateToCustomerPage,
    deleteCustomer,
}: {
    customer: ListCustomer;
    navigateToCustomerPage: Function;
    deleteCustomer: Function;
}) {
    const { t } = useTranslation();
    return (
        <div
            className="flex px-2 py-2 bg-zinc-200 rounded-lg justify-start items-center cursor-pointer h-16 mt-3"
            onClick={() => navigateToCustomerPage(customer.id)}
        >
            <div className="flex basis-11/12 justify-start items-center px-4 h-full">
                <div className="basis-2/12 font-bold">{customer.id}</div>
                <div className="basis-3/12">{customer.last_name}</div>
                <div className="basis-3/12">{customer.first_name}</div>
                <div className="basis-3/12">
                    {`${t.customers.customer.row.fidelityCard}: `}
                    <span className="font-bold">
                        {customer.fidelity_card ? customer.fidelity_card : '-'}
                    </span>
                </div>
            </div>
            <div className="flex basis-1/12 items-center justify-end h-full">
                <FontAwesomeIcon
                    className="mx-2 fa-lg text-red-600"
                    icon={faTrash}
                    title={t.customers.customer.row.deleteButton}
                    onClick={e => {
                        e.stopPropagation();
                        deleteCustomer(customer);
                    }}
                />
            </div>
        </div>
    );
}
