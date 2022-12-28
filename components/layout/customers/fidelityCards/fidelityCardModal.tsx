import Modal from '../../modal';
import React, { ChangeEvent, useEffect, useState } from 'react';
import clsx from 'clsx';
import useApi from '../../../useApi';
import { EASY_ERP_FIDELITY_CARD_BASE_URL } from '../../../../utils/urls';
import toast from 'react-hot-toast';

export default function FidelityCardModal({
    isOpen,
    onClose,
    fidelityCard,
}: {
    isOpen: boolean;
    onClose: Function;
    fidelityCard: {
        barcode: string;
        is_active: boolean;
    };
}) {
    const api = useApi();

    const [isNewFidelityCard, setIsNewFidelityCard] = useState(false);
    const [localFidelityCard, setLocalFidelityCard] = useState(fidelityCard);
    const [isEditing, setIsEditing] = useState(false);

    const closeModal = function (refresh: boolean) {
        onClose(refresh);
    };

    const saveFidelityCard = function () {
        if (isNewFidelityCard) {
            api.authAxios
                .post(
                    `${EASY_ERP_FIDELITY_CARD_BASE_URL}/${localFidelityCard.barcode}`,
                    localFidelityCard
                )
                .then(() => {
                    toast.success('Fidelity card created succesfully');
                    closeModal(true);
                })
                .catch(() => {
                    toast.error('Error while creating fidelity card');
                });
        } else {
            api.authAxios
                .put(
                    `${EASY_ERP_FIDELITY_CARD_BASE_URL}/${localFidelityCard.barcode}`,
                    localFidelityCard
                )
                .then(() => {
                    toast.success('Fidelity card updated succesfully');
                    closeModal(true);
                })
                .catch(() => {
                    toast.error('Error while updating fidelity card');
                });
        }
    };

    const revertChanges = function () {
        setIsEditing(false);
        setLocalFidelityCard({ barcode: '', is_active: false });
        closeModal(false);
    };

    const changeFormValue = function (
        e: ChangeEvent<HTMLInputElement>,
        field: string
    ) {
        setIsEditing(true);

        setLocalFidelityCard(prevState => ({
            ...prevState,
            [field]: field === 'is_active' ? e.target.checked : e.target.value,
        }));
    };

    useEffect(() => {
        if (fidelityCard.barcode !== '') {
            setLocalFidelityCard(fidelityCard);
            setIsNewFidelityCard(false);
        } else {
            setIsNewFidelityCard(true);
        }
        setIsEditing(false);
    }, [fidelityCard]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={revertChanges}
                title={
                    isNewFidelityCard
                        ? 'Aggiunta tessera fedeltà'
                        : 'Tessera fedeltà numero ' + fidelityCard.barcode
                }
                width=""
            >
                <div className="flex flex-row align-middle gap-1">
                    <input
                        type="text"
                        value={localFidelityCard.barcode}
                        placeholder="Barcode"
                        readOnly={!isNewFidelityCard}
                        className={clsx(
                            'basis-8/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md',
                            !isNewFidelityCard ? 'cursor-not-allowed' : ''
                        )}
                        onChange={e => changeFormValue(e, 'barcode')}
                    />
                    <div className="basis-4/12 p-2">
                        <label htmlFor="isActiveCheckbox">Attiva</label>
                        <input
                            id="isActiveCheckbox"
                            type="checkbox"
                            checked={localFidelityCard.is_active}
                            className="ml-2"
                            onChange={e => changeFormValue(e, 'is_active')}
                        />
                    </div>
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
                        onClick={saveFidelityCard}
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
