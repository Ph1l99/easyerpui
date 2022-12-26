import {
    EASY_ERP_ARTICLES_URL,
    EASY_ERP_CUSTOMER_BASE_URL,
    EASY_ERP_FIDELITY_CARD_BASE_URL,
    EASY_ERP_INVENTORY_URL,
    EASY_ERP_REPAIRS_BASE_URL,
    EASY_ERP_SELLING_BASE_URL,
    EASY_ERP_TRANSACTIONS_URL,
} from '../../../../utils/urls';
import clsx from 'clsx';
import DrawerMenuItem from './drawerMenuItem';
import { DrawerSubMenuItem } from './drawerSubMenuItem';

export default function Drawer({ isOpen }: { isOpen: boolean }) {
    return (
        <div
            className={clsx(
                'flex flex-col bg-sky-900 text-white font-light',
                isOpen ? ' h-full' : 'h-0 pt-0'
            )}
        >
            {isOpen && (
                <div className="ml-4 mt-5">
                    <ul className="flex flex-col gap-3">
                        <DrawerMenuItem url="/" description="Home" />

                        <DrawerMenuItem
                            url={EASY_ERP_SELLING_BASE_URL}
                            description="Vendita"
                        ></DrawerMenuItem>

                        <DrawerMenuItem
                            url={EASY_ERP_REPAIRS_BASE_URL}
                            description="Riparazioni"
                        />

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
