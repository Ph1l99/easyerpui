import {
    EASY_ERP_ARTICLES_URL,
    EASY_ERP_CUSTOMER_BASE_URL,
    EASY_ERP_FIDELITY_CARD_BASE_URL,
    EASY_ERP_INVENTORY_URL,
    EASY_ERP_REPAIRS_BASE_URL,
    EASY_ERP_TRANSACTIONS_URL,
} from '../../../utils/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import clsx from 'clsx';
import DrawerMenuItem from './drawerMenuItem';
import { DrawerSubMenuItem } from './drawerSubMenuItem';

export default function Drawer() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div
            className={clsx(
                'flex flex-col bg-sky-900 text-white w-56 font-light pt-4',
                isOpen ? ' h-screen' : ''
            )}
        >
            <div className="flex flex-row justify-start items-center pl-4 text-white">
                <FontAwesomeIcon
                    icon={faBars}
                    className="cursor-pointer"
                    onClick={() => setIsOpen(prev => !prev)}
                />
                <h1 className="text-upper ml-6 font-bold">EASY ERP</h1>
            </div>
            {isOpen && (
                <div className="ml-4 mt-5">
                    <ul className="flex flex-col gap-3">
                        <DrawerMenuItem url="/" description="Home" />

                        <DrawerMenuItem description="Magazzino" />
                        <ul className="flex flex-col gap-2">
                            <DrawerSubMenuItem
                                url={EASY_ERP_INVENTORY_URL}
                                description="Inventario"
                            />
                            <DrawerSubMenuItem
                                url={EASY_ERP_TRANSACTIONS_URL}
                                description="Movimentazioni"
                            />
                            <DrawerSubMenuItem
                                url={EASY_ERP_ARTICLES_URL}
                                description="Articoli"
                            />
                        </ul>

                        <DrawerMenuItem
                            url={EASY_ERP_REPAIRS_BASE_URL}
                            description="Riparazioni"
                        />

                        <DrawerMenuItem description="Clienti" />
                        <ul className="flex flex-col gap-2">
                            <DrawerSubMenuItem
                                url={EASY_ERP_CUSTOMER_BASE_URL}
                                description="Gestione clienti"
                            />
                            <DrawerSubMenuItem
                                url={EASY_ERP_FIDELITY_CARD_BASE_URL}
                                description="Tessere fedeltà"
                            />
                        </ul>
                    </ul>
                </div>
            )}
        </div>
    );
}
