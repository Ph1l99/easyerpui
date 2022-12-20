import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import useApi from '../../../components/useApi';
import {
    EASY_ERP_CUSTOMER_BASE_URL,
    EASY_ERP_FIDELITY_CARD_BASE_URL,
} from '../../../utils/urls';
import Head from 'next/head';
import toast from 'react-hot-toast';

export default function Customer() {
    const router = useRouter();
    const api = useApi();

    const { id } = router.query;

    const [customer, setCustomer] = useState({
        id: '-1',
        first_name: '',
        last_name: '',
        phone: '',
        fidelity_card: '',
    });
    const [fidelityCards, setFidelityCards] = useState([
        {
            barcode: '',
            is_active: true,
        },
    ]);
    const [beforeUpdateCustomer, setBeforeUpdateCustomer] = useState(customer);
    const [isEditing, setIsEditing] = useState(false);
    const [isNewCustomer, setIsNewCustomer] = useState(false);
    const [assignNewFidelityCard, setAssignNewFidelityCard] = useState(false);
    const [newFidelityCard, setNewFidelityCard] = useState('');

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
        setCustomer(beforeUpdateCustomer);
        setIsEditing(false);
    };

    const saveCustomer = function () {
        // If the new fidelity card is being set, I replace the old one with the new one
        if (newFidelityCard !== '') {
            customer.fidelity_card = newFidelityCard
        }

        if (isNewCustomer) {
            api.authAxios
                .post(`${EASY_ERP_CUSTOMER_BASE_URL}/-1`, customer)
                .then(() => {
                    toast.success('Customer created succesfully');
                    // todo push route with article id
                });
        } else {
            api.authAxios
                .put(`${EASY_ERP_CUSTOMER_BASE_URL}/${id}`, customer)
                .then(() => {
                    toast.success('Customer updated succesfully');
                });
        }
    };

    const loadAllFidelityCards = function () {
        api.authAxios
            .get(
                `${EASY_ERP_FIDELITY_CARD_BASE_URL}?is_active=true&is_available=true`
            )
            .then(response => {
                setFidelityCards(response.data.results);
            })
            .catch(() => {
                toast.error('Error while loading fidelity cards');
            });
    };

    useEffect(() => {
        loadAllFidelityCards();
        if (id === '-1') {
            setIsNewCustomer(true);
        } else {
            setIsNewCustomer(false);
            api.authAxios
                .get(`${EASY_ERP_CUSTOMER_BASE_URL}/${id}`)
                .then(response => {
                    setCustomer(response.data);
                    setBeforeUpdateCustomer(response.data);
                })
                .catch(() => {
                    toast.error('Error while retrieving customer info');
                });
        }
    }, [id]);
    return (
        <>
            <Head>
                <title>
                    {isNewCustomer ? 'Nuovo cliente' : `Cliente: ${id}`}
                </title>
            </Head>
            <div className="flex flex-col p-8 h-full">
                <div className="basis-1 /12 font-bold text-xl">
                    Cliente: {isNewCustomer ? '-' : id}
                </div>

                <div className="basis-1/12 flex justify-end">
                    {isEditing && (
                        <>
                            <input
                                type="button"
                                value="Salva"
                                className="basis-1/12 rounded-lg bg-green-600 text-white outline-none mr-4 text-center h-8 cursor-pointer"
                                onClick={saveCustomer}
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
                <div className="basis-11/12">
                    <div className="flex mt-5 text-center items-center gap-1">
                        <input
                            id="first_name"
                            type="text"
                            placeholder="Nome"
                            className="basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md"
                            value={customer.first_name}
                            onChange={e => changeFormValue(e, 'first_name')}
                        />
                        <input
                            id="last_name"
                            type="text"
                            placeholder="Cognome"
                            className="basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md"
                            value={customer.last_name}
                            onChange={e => changeFormValue(e, 'last_name')}
                        />
                        <input
                            id="phone"
                            type="text"
                            placeholder="Recapito"
                            className="basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md"
                            value={customer.phone}
                            onChange={e => changeFormValue(e, 'phone')}
                        />
                    </div>
                    <div className="flex mt-5 justify-start">
                        <input
                            id="oldFidelityCard"
                            type="text"
                            readOnly
                            placeholder="Tessera fedeltà"
                            className="basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md cursor-not-allowed"
                            value={customer.fidelity_card}
                        />
                        <div className="basis-4/12">
                            <label
                                htmlFor="isNewFidelityCardCheckbox"
                                className="pr-2"
                            >
                                Assegna nuova tessera fedeltà
                            </label>
                            <input
                                id="isNewFidelityCardCheckbox"
                                type="checkbox"
                                checked={assignNewFidelityCard}
                                onChange={e => {
                                    setAssignNewFidelityCard(e.target.checked);
                                }}
                            />
                        </div>
                        {assignNewFidelityCard && (
                            <select
                                id="fidelity_card"
                                placeholder="Nuova tessera fedeltà"
                                className="basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md"
                                value={newFidelityCard}
                                onChange={e =>
                                    setNewFidelityCard(e.target.value)
                                }
                            >
                                <option value="">
                                    Seleziona una carta fedeltà
                                </option>
                                {fidelityCards.map(fidelityCard => (
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
            </div>
        </>
    );
}
