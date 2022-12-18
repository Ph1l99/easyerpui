import React, { ChangeEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt, faTag } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import clsx from 'clsx';
import {
    EASY_ERP_REPAIR_STATUS_URL,
    EASY_ERP_REPAIRS_URL,
} from '../../utils/urls';
import useApi from '../../components/useApi';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function Repair() {
    const router = useRouter();
    const api = useApi();

    const { barcode } = router.query;

    const [repair, setRepair] = useState({
        title: '',
        description: '',
        barcode: '',
        delivery_date: '',
        customer: '',
        insert_date_time: '',
        status: '',
    });
    const [repairStatuses, setRepairStatuses] = useState([
        {
            id: 0,
            status: '',
            is_active: true,
            class_name: '',
        },
    ]);
    const [beforeUpdateRepair, setBeforeUpdateRepair] = useState(repair);
    const [isEditing, setIsEditing] = useState(false);
    const [isNewRepair, setIsNewRepair] = useState(false);

    const printRepairReceipt = function () {
        if (barcode) {
            api.authAxios.post(`${EASY_ERP_REPAIRS_URL}/${barcode}/receipt`);
        }
    };
    const printRepairLabel = function () {
        if (barcode) console.log('PRINTING BARCODE: ', barcode); //todo
    };

    const loadRepairInfo = function () {
        if (barcode) {
            api.authAxios
                .get(`${EASY_ERP_REPAIRS_URL}${barcode}`)
                .then(response => {
                    setRepair(response.data);
                })
                .catch(() => {
                    toast.error('Error while loading repair info');
                });
        }
    };

    const loadRepairStatusInfo = function () {
        api.authAxios
            .get(EASY_ERP_REPAIR_STATUS_URL)
            .then(response => {
                setRepairStatuses(response.data);
            })
            .catch(() => {
                toast.error('Error while loading repair status info');
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
        if (isNewRepair) {
            api.authAxios
                .post(`${EASY_ERP_REPAIRS_URL}-1`, repair)
                .then(() => {
                    toast.success('Repair created succesfully');
                    setIsEditing(false);
                })
                .catch(() => {
                    toast.error('Error while creating repair');
                });
        } else {
            api.authAxios
                .put(`${EASY_ERP_REPAIRS_URL}${barcode}`, repair)
                .then(() => {
                    toast.success('Repair updated succesfully');
                    setIsEditing(false);
                })
                .catch(() => {
                    toast.error('Error while updating repair');
                });
        }
    };

    const revertChanges = function () {
        setRepair(beforeUpdateRepair);
        setIsEditing(false);
    };

    useEffect(() => {
        loadRepairStatusInfo();
        if (barcode == '-1') {
            setIsNewRepair(true);
        } else {
            setIsNewRepair(false);
            loadRepairInfo();
        }
    }, [barcode]);

    return (
        <>
            <Head>
                <title>
                    {isNewRepair
                        ? 'Nuova riparazione'
                        : `Riparazione ${barcode}`}
                </title>
            </Head>
            <div className="flex flex-col p-8 h-full">
                <div className="basis-1 /12 font-bold text-xl">
                    Dettaglio riparazione - {isNewRepair ? '' : repair.barcode}
                </div>
                <div className="basis-1/12 flex justify-end">
                    {isEditing && (
                        <>
                            <input
                                type="button"
                                value="Salva"
                                className="basis-1/12 rounded-lg bg-green-600 text-white outline-none mr-4 text-center h-8 cursor-pointer"
                                onClick={saveRepair}
                            />
                            <input
                                type="button"
                                value="Annulla"
                                className="basis-1/12 rounded-lg bg-red-600 text-white outline-none text-center h-8 cursor-pointer"
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
                                : ' cursor-pointer'
                        )}
                        icon={faReceipt}
                        title="Stampa ricevuta"
                        onClick={printRepairReceipt}
                    ></FontAwesomeIcon>
                    <FontAwesomeIcon
                        className={clsx(
                            'mx-2 fa-xl',
                            isNewRepair
                                ? 'cursor-not-allowed'
                                : ' cursor-pointer'
                        )}
                        icon={faTag}
                        title="Stampa etichetta"
                        onClick={printRepairLabel}
                    ></FontAwesomeIcon>
                </div>
                <div className="basis-9/12">
                    <input
                        type="text"
                        placeholder="Titolo"
                        className="bg-zinc-200 w-full outline-none p-2 placeholder-black align-middle rounded-md"
                        maxLength={100}
                        value={repair.title}
                        onChange={e => {
                            changeFormValue(e, 'title');
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Descrizione"
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
                            placeholder="Data consegna"
                            className="basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md"
                            value={repair.delivery_date}
                            onChange={e => {
                                changeFormValue(e, 'delivery_date');
                            }}
                        />
                        <select
                            className="basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md cursor-pointer"
                            value={repair.status}
                            onChange={e => {
                                changeFormValue(e, 'status');
                            }}
                        >
                            <option value="">Seleziona uno stato</option>
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
                            placeholder="Cliente"
                            className="basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md"
                            value={repair.customer}
                            onChange={e => {
                                changeFormValue(e, 'customer'); //todo replace with customer select
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
