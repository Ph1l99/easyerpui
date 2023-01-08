import { CustomerDetail, PaginationResult } from '../../../../utils/types';
import Modal from '../../modal';
import React, { useEffect, useState } from 'react';
import useApi from '../../../useApi';
import { EASY_ERP_CUSTOMERS_BASE_URL } from '../../../../utils/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../appLayout/pagination/pagination';
import useTranslation from '../../../useTranslation';
import { toastOnErrorApiResponse } from '../../../../utils/toast';

export default function CustomerRepairModal({
    isOpen,
    onClose,
    customer,
}: {
    isOpen: boolean;
    onClose: Function;
    customer: CustomerDetail;
}) {
    const { authAxios } = useApi();
    const { t } = useTranslation();

    const [isNewAssignment, setIsNewAssignment] = useState(false);
    const [localSelectedCustomer, setLocalSelectedCustomer] =
        useState(customer);
    const [availableCustomers, setAvailableCustomers] =
        useState<PaginationResult>({});

    const closeModal = function (customer: CustomerDetail, updated: boolean) {
        setLocalSelectedCustomer({});
        onClose(customer, updated);
    };

    const loadCustomers = function (url: string) {
        authAxios
            .get(url)
            .then(response => {
                setAvailableCustomers(response.data);
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.repairs.modal.api.getCustomersError
                );
            });
    };

    const revertChanges = function () {
        setLocalSelectedCustomer({});
        closeModal(customer, false);
    };

    const saveCustomerAssignment = function () {
        closeModal(
            localSelectedCustomer,
            customer.id !== localSelectedCustomer.id
        );
    };

    useEffect(() => {
        loadCustomers(`${EASY_ERP_CUSTOMERS_BASE_URL}/`);
        if (customer.id === -1) {
            setIsNewAssignment(true);
            setLocalSelectedCustomer({});
        } else {
            setIsNewAssignment(false);
            setLocalSelectedCustomer(customer);
        }
    }, [isOpen]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    closeModal(customer, false);
                }}
                title={
                    isNewAssignment
                        ? `${t.repairs.modal.title.newCustomer}`
                        : `${t.repairs.modal.title.editCustomer}`
                }
            >
                <div className="flex flex-row">
                    {`${t.repairs.modal.selectedCustomer}: ${localSelectedCustomer.last_name} ${localSelectedCustomer.first_name}`}
                </div>
                <hr className="mt-4" />
                <div className="flex flex-col">
                    {availableCustomers.results?.map(
                        (customer: CustomerDetail) => (
                            <div
                                className="flex w-full justify-between p-2"
                                key={customer.id}
                            >
                                <div className="w-1/3">
                                    {customer.last_name}
                                </div>
                                <div className="w-1/3">
                                    {customer.first_name}
                                </div>
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className="text-gray-600 cursor-pointer"
                                    title={t.repairs.modal.selectCustomer}
                                    onClick={() => {
                                        setLocalSelectedCustomer(customer);
                                    }}
                                />
                            </div>
                        )
                    )}
                </div>
                <Pagination
                    handleNextPage={() =>
                        loadCustomers(availableCustomers.next!.slice(4)!)
                    }
                    handlePreviousPage={() =>
                        loadCustomers(availableCustomers.previous!.slice(4)!)
                    }
                    hasNextPage={!!availableCustomers.next}
                    hasPreviousPage={!!availableCustomers.previous}
                />
                <hr />
                <div className="flex flex-row justify-end mt-4">
                    <input
                        type="button"
                        value={t.genericComponents.buttons.save}
                        className="basis-2/12 py-1 px-1 rounded-lg bg-green-600 text-white outline-none mr-4 text-center h-fit font-bold cursor-pointer"
                        onClick={saveCustomerAssignment}
                    />
                    <input
                        type="button"
                        value={t.genericComponents.buttons.cancel}
                        className="basis-2/12 py-1 px-1 rounded-lg bg-red-600 text-white outline-none text-center h-fit cursor-pointer font-bold"
                        onClick={revertChanges}
                    />
                </div>
            </Modal>
        </>
    );
}
