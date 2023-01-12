import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import useApi from '../../../components/useApi';
import {
    EASY_ERP_CUSTOMER_BASE_URL,
    EASY_ERP_FIDELITY_CARD_BASE_URL,
    EASY_ERP_REPAIRS_URL,
} from '../../../utils/urls';
import Head from 'next/head';
import {
    CustomerDetail,
    FidelityCard,
    PaginationResult,
    RepairDetail,
} from '../../../utils/types';
import {
    toastOnErrorApiResponse,
    toastOnSuccessApiResponse,
} from '../../../utils/toast';
import useTranslation from '../../../components/useTranslation';
import Pagination from '../../../components/layout/appLayout/pagination/pagination';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export default function Customer() {
    const router = useRouter();
    const { authAxios } = useApi();
    const { t } = useTranslation();
    const { id } = router.query;

    const [customer, setCustomer] = useState<CustomerDetail>({});
    const [fidelityCards, setFidelityCards] = useState<FidelityCard[]>([]);
    const [beforeUpdateCustomer, setBeforeUpdateCustomer] =
        useState<CustomerDetail>(customer);
    const [isEditing, setIsEditing] = useState(false);
    const [isNewCustomer, setIsNewCustomer] = useState(false);
    const [assignNewFidelityCard, setAssignNewFidelityCard] = useState(false);
    const [newFidelityCard, setNewFidelityCard] = useState('');
    const [repairsForCustomer, setRepairsForCustomer] =
        useState<PaginationResult>({});

    const changeFormValue = function (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: string
    ) {
        setIsEditing(true);

        setCustomer(prevState => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    const revertChanges = function () {
        if (beforeUpdateCustomer.fidelity_card == customer!.fidelity_card)
            setAssignNewFidelityCard(false);
        setCustomer(beforeUpdateCustomer);
        setIsEditing(false);
    };

    const saveCustomer = function () {
        // If the new fidelity card is being set, I replace the old one with the new one
        if (newFidelityCard !== '') {
            customer!.fidelity_card = newFidelityCard;
        }

        isNewCustomer ? createCustomer() : updateCustomer();
    };

    const updateCustomer = function () {
        authAxios
            .put(`${EASY_ERP_CUSTOMER_BASE_URL}/${id}`, customer)
            .then(response => {
                toastOnSuccessApiResponse(
                    response,
                    t.customers.customer.detail.api.updateCustomerSuccess
                );
                setIsEditing(false);
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.customers.customer.detail.api.updateCustomerError
                );
            });
    };

    const createCustomer = function () {
        let newCustomer = customer;
        delete newCustomer.id;
        authAxios
            .post(`${EASY_ERP_CUSTOMER_BASE_URL}/-1`, newCustomer)
            .then(response => {
                toastOnSuccessApiResponse(
                    response,
                    t.customers.customer.detail.api.createCustomerSuccess
                );
                router.replace(
                    `${EASY_ERP_CUSTOMER_BASE_URL}/${response.data.id}`
                );
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.customers.customer.detail.api.createCustomerError
                );
            });
    };

    const loadAllActiveAndAvailableFidelityCards = function () {
        authAxios
            .get(
                `${EASY_ERP_FIDELITY_CARD_BASE_URL}?is_active=true&is_available=true`
            )
            .then(response => {
                setFidelityCards(response.data.results);
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.customers.customer.detail.api.getFidelityCardError
                );
            });
    };

    const loadRepairsForCustomer = function (url: string) {
        authAxios.get(url).then(response => {
            setRepairsForCustomer(response.data);
        });
    };

    useEffect(() => {
        setIsEditing(false);
        loadAllActiveAndAvailableFidelityCards();
        if (id === '-1') {
            setIsNewCustomer(true);
        } else if (id !== undefined) {
            setIsNewCustomer(false);
            authAxios
                .get(`${EASY_ERP_CUSTOMER_BASE_URL}/${id}`)
                .then(response => {
                    setCustomer(response.data);
                    setBeforeUpdateCustomer(response.data);
                    loadRepairsForCustomer(
                        `${EASY_ERP_REPAIRS_URL}?customer=${id}`
                    );
                })
                .catch(error => {
                    toastOnErrorApiResponse(
                        error,
                        t.customers.customer.detail.api.getCustomerInfoError
                    );
                });
        }
    }, [id]);

    return (
        <>
            <Head>
                <title>
                    {isNewCustomer
                        ? `${t.customers.customer.detail.pageTitle.newCustomer}`
                        : `${t.customers.customer.detail.pageTitle.customer}: ${id}`}
                </title>
            </Head>
            <div className="flex flex-col p-8 h-full">
                <div className="basis-1/12 font-bold text-xl">
                    {t.customers.customer.detail.pageTitle.customer}:{' '}
                    {isNewCustomer ? '-' : id}
                </div>

                <div className="basis-1/12 flex justify-end">
                    {isEditing && (
                        <>
                            <input
                                type="button"
                                value={t.genericComponents.buttons.save}
                                className="basis-1/12 py-1 rounded-lg bg-green-600 text-white outline-none mr-4 text-center h-fit cursor-pointer font-bold"
                                onClick={saveCustomer}
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
                <div className="basis-3/12">
                    <div className="flex mt-5 text-center items-center gap-1">
                        <input
                            id="first_name"
                            type="text"
                            placeholder={t.customers.customer.detail.firstName}
                            className="basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md"
                            value={customer?.first_name}
                            onChange={e => changeFormValue(e, 'first_name')}
                        />
                        <input
                            id="last_name"
                            type="text"
                            placeholder={t.customers.customer.detail.lastName}
                            className="basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md"
                            value={customer?.last_name}
                            onChange={e => changeFormValue(e, 'last_name')}
                        />
                        <input
                            id="phone"
                            type="text"
                            placeholder={t.customers.customer.detail.phone}
                            className="basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md"
                            value={customer?.phone}
                            onChange={e => changeFormValue(e, 'phone')}
                        />
                    </div>
                    <div className="flex mt-5 justify-start">
                        <input
                            id="oldFidelityCard"
                            type="text"
                            readOnly
                            placeholder={
                                t.customers.customer.detail.fidelityCard
                            }
                            className="basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md cursor-not-allowed"
                            value={customer?.fidelity_card}
                        />
                        <div className="basis-4/12 flex justify-center text-center items-center">
                            <label
                                htmlFor="isNewFidelityCardCheckbox"
                                className="pr-2"
                            >
                                {t.customers.customer.detail.assignFidelityCard}
                            </label>
                            <input
                                id="isNewFidelityCardCheckbox"
                                type="checkbox"
                                checked={assignNewFidelityCard}
                                onChange={e => {
                                    e.target.checked
                                        ? setIsEditing(true)
                                        : setIsEditing(false);
                                    setAssignNewFidelityCard(e.target.checked);
                                }}
                            />
                        </div>
                        {assignNewFidelityCard && (
                            <select
                                id="fidelity_card"
                                placeholder={
                                    t.customers.customer.detail.newFidelityCard
                                }
                                className="basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md"
                                value={newFidelityCard}
                                onChange={e =>
                                    setNewFidelityCard(e.target.value)
                                }
                            >
                                <option value="">
                                    {
                                        t.customers.customer.detail
                                            .selectNewFidelityCard
                                    }
                                </option>
                                {fidelityCards!.map(fidelityCard => (
                                    <option
                                        key={fidelityCard.barcode}
                                        value={fidelityCard.barcode}
                                    >
                                        {fidelityCard.barcode}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
                <div className="basis-1/12 font-bold">
                    {t.customers.customer.detail.customerRepairs}
                </div>
                <div className="basis-6/12 flex flex-col justify-between">
                    {repairsForCustomer.results?.map(
                        (repairForCustomer: RepairDetail) => (
                            <div
                                className="flex px-2 py-2 bg-zinc-200 rounded-lg justify-start items-center h-10 mt-3"
                                key={repairForCustomer.barcode}
                            >
                                <div className="basis-4/12">
                                    {repairForCustomer.title}
                                </div>
                                <div className="basis-4/12">
                                    <div
                                        className={clsx(
                                            'w-6/12 font-bold text-white text-center rounded-lg capitalize',
                                            repairForCustomer.status?.class_name
                                                ? `bg-${repairForCustomer.status.class_name}`
                                                : 'bg-sky-900'
                                        )}
                                    >
                                        {repairForCustomer.status?.status}
                                    </div>
                                </div>
                                <div className="basis-3/12 font-bold">
                                    <span className="font-normal">
                                        {`${t.repairs.row.delivery}: `}
                                    </span>
                                    {repairForCustomer.delivery_date}
                                </div>
                                <FontAwesomeIcon
                                    icon={faArrowUpRightFromSquare}
                                    className="basis-1/12 cursor-pointer"
                                    title={
                                        t.customers.customer.detail
                                            .navigateToCustomerRepair
                                    }
                                    onClick={() => {
                                        router.push(
                                            `${EASY_ERP_REPAIRS_URL}${repairForCustomer.barcode}`
                                        );
                                    }}
                                />
                            </div>
                        )
                    )}
                    <Pagination
                        hasPreviousPage={!!repairsForCustomer.previous}
                        hasNextPage={!!repairsForCustomer.next}
                        handlePreviousPage={() => {
                            loadRepairsForCustomer(
                                repairsForCustomer.previous!.slice(4)!
                            );
                        }}
                        handleNextPage={() => {
                            loadRepairsForCustomer(
                                repairsForCustomer.next!.slice(4)!
                            );
                        }}
                    />
                </div>
            </div>
        </>
    );
}
