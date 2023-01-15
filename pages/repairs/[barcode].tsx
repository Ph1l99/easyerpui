import React, { ChangeEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt, faTag } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import clsx from 'clsx';
import {
    EASY_ERP_CUSTOMER_BASE_URL,
    EASY_ERP_REPAIR_STATUS_URL,
    EASY_ERP_REPAIRS_URL,
} from '../../utils/urls';
import useApi from '../../components/useApi';
import { useRouter } from 'next/router';
import { CustomerDetail, RepairDetail, RepairStatus } from '../../utils/types';
import CustomerRepairModal from '../../components/layout/customers/customer/customerRepairModal';
import useTranslation from '../../components/useTranslation';
import {
    toastOnErrorApiResponse,
    toastOnSuccessApiResponse,
} from '../../utils/toast';

export default function Repair() {
    const router = useRouter();
    const { authAxios } = useApi();
    const { t } = useTranslation();
    const { barcode } = router.query;

    const [repair, setRepair] = useState<RepairDetail>({ barcode: '-1' });
    const [repairStatuses, setRepairStatuses] = useState<RepairStatus[]>([]);
    const [repairCustomer, setRepairCustomer] = useState<CustomerDetail>({});
    const [beforeUpdateRepair, setBeforeUpdateRepair] = useState(repair);
    const [isEditing, setIsEditing] = useState(false);
    const [isNewRepair, setIsNewRepair] = useState(false);
    const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

    const printRepairReceipt = function () {
        if (barcode !== '-1') {
            authAxios
                .post(`${EASY_ERP_REPAIRS_URL}${barcode}/receipt`)
                .then(response => {
                    toastOnSuccessApiResponse(
                        response,
                        t.repairs.detail.api.printReceiptSuccess
                    );
                })
                .catch(error => {
                    toastOnErrorApiResponse(
                        error,
                        t.repairs.detail.api.printReceiptError
                    );
                });
        }
    };
    const printRepairLabel = function () {
        if (barcode !== '-1') {
            authAxios
                .post(`${EASY_ERP_REPAIRS_URL}${barcode}/label`)
                .then(response => {
                    toastOnSuccessApiResponse(
                        response,
                        t.repairs.detail.api.printLabelSuccess
                    );
                })
                .catch(error => {
                    toastOnErrorApiResponse(
                        error,
                        t.repairs.detail.api.printLabelError
                    );
                });
        }
    };

    const loadRepairInfo = function () {
        if (barcode) {
            authAxios
                .get(`${EASY_ERP_REPAIRS_URL}${barcode}`)
                .then(response => {
                    setRepair(response.data);
                    setBeforeUpdateRepair(response.data);
                    if (response.data.customer)
                        loadRepairCustomerInfo(response.data.customer);
                })
                .catch(error => {
                    toastOnErrorApiResponse(
                        error,
                        t.repairs.detail.api.getRepairInfoError
                    );
                });
        }
    };

    const loadRepairStatusInfo = function () {
        authAxios
            .get(EASY_ERP_REPAIR_STATUS_URL)
            .then(response => {
                setRepairStatuses(response.data);
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.repairs.detail.api.getRepairInfoError
                );
            });
    };

    const loadRepairCustomerInfo = function (customer: string) {
        authAxios
            .get(`${EASY_ERP_CUSTOMER_BASE_URL}/${customer}`)
            .then(response => {
                setRepairCustomer(response.data);
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.repairs.detail.api.getRepairCustomerInfoError
                );
            });
    };

    const changeFormValue = function (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: string
    ) {
        setIsEditing(true);

        setRepair(prevState => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    const saveRepair = function () {
        let repairToSend = repair;
        if (repair.delivery_date == '') {
            delete repairToSend.delivery_date;
        }
        isNewRepair ? createRepair(repairToSend) : updateRepair(repairToSend);
    };

    const updateRepair = function (repair: any) {
        authAxios
            .put(`${EASY_ERP_REPAIRS_URL}${barcode}`, repair)
            .then(response => {
                toastOnSuccessApiResponse(
                    response,
                    t.repairs.detail.api.updateRepairSuccess
                );
                setIsEditing(false);
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.repairs.detail.api.updateRepairError
                );
            });
    };

    const createRepair = function (repair: any) {
        authAxios
            .post(`${EASY_ERP_REPAIRS_URL}-1`, repair)
            .then(response => {
                toastOnSuccessApiResponse(
                    response,
                    t.repairs.detail.api.createRepairSuccess
                );
                router.replace(
                    `${EASY_ERP_REPAIRS_URL}${response.data.barcode}`
                );
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.repairs.detail.api.createRepairError
                );
            });
    };

    const closeCustomerModal = function (
        customer: CustomerDetail,
        updated: boolean
    ) {
        setIsCustomerModalOpen(false);
        if (updated) {
            setRepairCustomer(customer);
            setRepair(prevState => ({
                ...prevState,
                customer: customer.id!,
            }));
            setIsEditing(true);
        }
    };

    const revertChanges = function () {
        setRepair(beforeUpdateRepair);
        setIsEditing(false);
    };

    useEffect(() => {
        setIsEditing(false);
        loadRepairStatusInfo();
        if (barcode == '-1') {
            setIsNewRepair(true);
        } else if (barcode !== undefined) {
            loadRepairInfo();
            setIsNewRepair(false);
        }
    }, [barcode]);

    return (
        <>
            <Head>
                <title>
                    {isNewRepair
                        ? `${t.repairs.detail.pageTitle.newRepair}`
                        : `${t.repairs.detail.pageTitle.repair} ${barcode}`}
                </title>
            </Head>
            <div className="flex flex-col p-8 h-full">
                <div className="basis-1 /12 font-bold text-xl">
                    {`${t.repairs.detail.pageTitle.repair} - ${
                        isNewRepair ? '' : repair.barcode
                    }`}
                </div>
                <div className="basis-1/12 flex justify-end">
                    {isEditing && (
                        <>
                            <input
                                type="button"
                                value={t.genericComponents.buttons.save}
                                className="basis-1/12 py-1 rounded-lg bg-green-600 text-white outline-none mr-4 text-center h-fit cursor-pointer font-bold"
                                onClick={saveRepair}
                            />
                            <input
                                type="button"
                                value={t.genericComponents.buttons.cancel}
                                className="basis-1/12 py-1 rounded-lg bg-red-600 text-white outline-none text-center h-fit cursor-pointer font-bold"
                                onClick={revertChanges}
                            />
                        </>
                    )}
                </div>
                <div className="basis-1/12 justify-end flex items-center">
                    <FontAwesomeIcon
                        className={clsx(
                            'mx-2 fa-xl',
                            isNewRepair
                                ? 'cursor-not-allowed'
                                : 'cursor-pointer'
                        )}
                        icon={faReceipt}
                        title={t.repairs.detail.print.receipt}
                        onClick={printRepairReceipt}
                    />
                    <FontAwesomeIcon
                        className={clsx(
                            'mx-2 fa-xl',
                            isNewRepair
                                ? 'cursor-not-allowed'
                                : 'cursor-pointer'
                        )}
                        icon={faTag}
                        title={t.repairs.detail.print.label}
                        onClick={printRepairLabel}
                    />
                </div>
                <div className="basis-9/12">
                    <input
                        type="text"
                        placeholder={t.repairs.detail.title}
                        className="bg-zinc-200 w-full outline-none p-2 placeholder-black align-middle rounded-md"
                        maxLength={100}
                        value={repair.title}
                        onChange={e => {
                            changeFormValue(e, 'title');
                        }}
                    />
                    <input
                        type="text"
                        placeholder={t.repairs.detail.description}
                        className="mt-5 bg-zinc-200 w-full outline-none p-2 placeholder-black h-40 rounded-md"
                        maxLength={250}
                        value={repair.description}
                        onChange={e => {
                            changeFormValue(e, 'description');
                        }}
                    />
                    <div className="flex mt-5 gap-6 justify-start">
                        <input
                            type="date"
                            placeholder={t.repairs.detail.deliveryDate}
                            className="basis-3/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md"
                            value={repair.delivery_date}
                            onChange={e => {
                                changeFormValue(e, 'delivery_date');
                            }}
                        />
                        <select
                            className="basis-3/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md cursor-pointer"
                            value={repair.status}
                            onChange={e => {
                                changeFormValue(e, 'status');
                            }}
                        >
                            <option value="">{t.repairs.detail.status}</option>
                            {repairStatuses.map(statusItem => (
                                <option
                                    key={statusItem.id}
                                    value={statusItem.id}
                                >
                                    {statusItem.status}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder={t.repairs.detail.customer}
                            readOnly
                            className="basis-3/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md cursor-pointer"
                            value={
                                repairCustomer.last_name
                                    ? `${repairCustomer.last_name} ${repairCustomer.first_name}`
                                    : ''
                            }
                            onClick={() => {
                                setIsCustomerModalOpen(true);
                            }}
                        />
                        <input
                            type="text"
                            placeholder={t.repairs.detail.customerPhone}
                            readOnly
                            className="basis-3/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md cursor-not-allowed"
                            value={repairCustomer.phone}
                        />
                    </div>
                </div>
            </div>
            <CustomerRepairModal
                customer={repairCustomer}
                isOpen={isCustomerModalOpen}
                onClose={closeCustomerModal}
            />
        </>
    );
}
