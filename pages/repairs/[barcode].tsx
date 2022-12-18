import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt, faTag } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import clsx from 'clsx';
import { EASY_ERP_REPAIRS_URL } from '../../utils/urls';
import useApi from '../../components/useApi';
import { useRouter } from 'next/router';

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
        customer_phone: '',
        insert_date_time: '',
        status: 1,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isNewRepair, setIsNewRepair] = useState(true);

    const printRepairReceipt = function (barcode: string) {
        if (barcode) {
            api.authAxios.post(`${EASY_ERP_REPAIRS_URL}/${barcode}/receipt`);
        }
    };
    const printRepairLabel = function (barcode: string) {
        if (barcode) console.log('PRINTING BARCODE: ', barcode); //todo
    };
    // todo just for testing
    const status: any[] = [
        {
            id: 1,
            status: 'DA LAVORARE',
            is_active: true,
            class_name: '',
        },
        {
            id: 2,
            status: 'DA CONSENGARE',
            is_active: true,
            class_name: '',
        },
        {
            id: 3,
            status: 'IN LAVORAZIONE',
            is_active: true,
            class_name: '',
        },
        {
            id: 4,
            status: 'CONSEGNATO',
            is_active: true,
            class_name: '',
        },
    ];
    return (
        <>
            <Head>
                <title>{barcode}</title>
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
                                className="basis-1/12 rounded-lg bg-green-600 text-white outline-none mr-4 text-center h-8"
                            />
                            <input
                                type="button"
                                value="Annulla"
                                className="basis-1/12 rounded-lg bg-red-600 text-white outline-none text-center h-8"
                            />
                        </>
                    )}
                </div>
                <div className="basis-1/12 justify-end flex items-center">
                    <FontAwesomeIcon
                        className="mx-2 fa-xl cursor-pointer"
                        icon={faReceipt}
                        title="Stampa ricevuta"
                    ></FontAwesomeIcon>
                    <FontAwesomeIcon
                        className="mx-2 fa-xl cursor-pointer"
                        icon={faTag}
                        title="Stampa etichetta"
                    ></FontAwesomeIcon>
                </div>
                <div className="basis-9/12">
                    <input
                        type="text"
                        placeholder="Titolo"
                        className="bg-zinc-200 w-full outline-none p-2 placeholder-black align-middle rounded-md"
                        maxLength={100}
                        value={repair.title}
                    />
                    <input
                        type="text"
                        placeholder="Descrizione"
                        className="mt-5 bg-zinc-200 w-full outline-none p-2 placeholder-black h-40 rounded-md"
                        maxLength={250}
                        value={repair.description}
                    />
                    <div className="flex mt-5 gap-6 justify-start">
                        <input
                            type="date"
                            placeholder="Data consegna"
                            className="basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md"
                            value={repair.delivery_date}
                        />
                        <select
                            className={clsx(
                                'basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md',
                                isNewRepair ? 'cursor-not-allowed' : ''
                            )}
                            disabled={isNewRepair}
                        >
                            {status.map(statusItem => (
                                <option
                                    key={statusItem.id}
                                    value={statusItem.id}
                                >
                                    {statusItem.status}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex mt-5 gap-6 justify-start">
                        <input
                            type="text"
                            placeholder="Cliente"
                            className="basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md"
                            value={repair.customer}
                        />
                        <input
                            type="text"
                            placeholder="Contatto"
                            className="basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md"
                            value={repair.customer_phone}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
