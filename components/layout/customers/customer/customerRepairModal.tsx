import { CustomerDetail, PaginationResult } from '../../../../utils/types';
import Modal from '../../modal';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import useApi from '../../../useApi';
import { EASY_ERP_CUSTOMERS_BASE_URL } from '../../../../utils/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function CustomerRepairModal({
    isOpen,
    onClose,
    customer,
}: {
    isOpen: boolean;
    onClose: Function;
    customer: CustomerDetail;
}) {
    const api = useApi();

    const [isNewAssignment, setIsNewAssignment] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [localSelectedCustomer, setLocalSelectedCustomer] =
        useState(customer);
    const [availableCustomers, setAvailableCustomers] =
        useState<PaginationResult>({});

    const closeModal = function (customer: CustomerDetail) {
        setLocalSelectedCustomer({});
        onClose(customer);
    };

    const loadCustomers = function () {
        api.authAxios.get(`${EASY_ERP_CUSTOMERS_BASE_URL}/`).then(response => {
            setAvailableCustomers(response.data);
        });
    };

    const revertChanges = function () {
        setIsEditing(false);
        setLocalSelectedCustomer({});
        closeModal(customer);
    };

    const saveCustomerAssignment = function () {
        // todo check if different
        closeModal(localSelectedCustomer);
    };

    useEffect(() => {
        loadCustomers();
        if (customer.id === -1) {
            setIsNewAssignment(true);
            setLocalSelectedCustomer({});
        } else {
            setIsNewAssignment(false);
            setLocalSelectedCustomer(customer);
        }
        setIsEditing(false);
    }, [isOpen]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    closeModal(customer);
                }}
                title={
                    isNewAssignment
                        ? 'Assegna cliente riparazione'
                        : 'Modifica cliente riparazione'
                }
                width=""
            >
                <div className="flex flex-row">
                    Cliente selezionato: {customer.last_name}{' '}
                    {customer.first_name}
                </div>
                <hr className="mt-4" />
                <div className="flex flex-col">
                    {/*{availableCustomers &&*/}
                    {/*    availableCustomers.results!.map(*/}
                    {/*        (customer: CustomerDetail) => (*/}
                    {/*            <div*/}
                    {/*                className="flex w-full justify-between p-2"*/}
                    {/*                key={customer.id}*/}
                    {/*            >*/}
                    {/*                <span>{customer.last_name}</span>*/}
                    {/*                <span>{customer.first_name}</span>*/}
                    {/*                <FontAwesomeIcon*/}
                    {/*                    icon={faCheck}*/}
                    {/*                    className="text-gray-600 cursor-pointer"*/}
                    {/*                    title="Seleziona"*/}
                    {/*                    onClick={() => {*/}
                    {/*                        setLocalSelectedCustomer(customer);*/}
                    {/*                    }}*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*        )*/}
                    {/*    )}*/}
                    <></>
                    {/*todo does not work*/}
                </div>
                <hr className="mt-4" />
                <div className="flex flex-row justify-end mt-4">
                    <input
                        type="button"
                        value="Salva"
                        className={clsx(
                            'basis-2/12 py-1 px-1 rounded-lg bg-green-600 text-white outline-none mr-4 text-center h-fit font-bold',
                            isEditing ? 'cursor-pointer' : 'cursor-not-allowed'
                        )}
                        disabled={!isEditing}
                        onClick={saveCustomerAssignment}
                    />
                    <input
                        type="button"
                        value="Annulla"
                        className="basis-2/12 py-1 px-1 rounded-lg bg-red-600 text-white outline-none text-center h-fit cursor-pointer font-bold"
                        onClick={revertChanges}
                    />
                </div>
            </Modal>
        </>
    );
}
