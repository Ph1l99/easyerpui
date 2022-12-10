import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

export default function Repair() {
    const [repair, setRepair] = useState({
        title: '',
        description: '',
        barcode: '',
        delivery_date: new Date(),
        customer: '',
        customer_phone: '',
        insert_date_time: new Date(),
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isNewRepair, setIsNewRepair] = useState(true);
    return (
        <>
            <div className="flex flex-col p-8 h-full">
                <div className="basis-1 /12 font-bold text-xl">Articolo</div>

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
                <div className="basis-1/12 text-right">
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
                    <div className="flex mt-5 text-center items-center">
                        <input
                            type="text"
                            readOnly={!isNewRepair}
                            placeholder="Barcode"
                            className={clsx(
                                'basis-4/12 bg-zinc-200 w-full outline-none p-2 placeholder-black rounded-md',
                                !isNewRepair ? 'cursor-not-allowed' : ''
                            )}
                            value={repair.barcode}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
