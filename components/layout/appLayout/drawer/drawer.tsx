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
import useTranslation from '../../../useTranslation';

export default function Drawer({ isOpen }: { isOpen: boolean }) {
    const { t } = useTranslation();
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
                        <DrawerMenuItem url="/" description={t.drawer.home} />

                        <DrawerMenuItem
                            url={EASY_ERP_SELLING_BASE_URL}
                            description={t.drawer.selling}
                        ></DrawerMenuItem>

                        <DrawerMenuItem
                            url={EASY_ERP_REPAIRS_BASE_URL}
                            description={t.drawer.repairs}
                        />

                        <DrawerMenuItem
                            description={t.drawer.warehouse.warehouse}
                        />
                        <ul className="flex flex-col gap-2">
                            <DrawerSubMenuItem
                                url={EASY_ERP_INVENTORY_URL}
                                description={t.drawer.warehouse.inventory}
                            />
                            <DrawerSubMenuItem
                                url={EASY_ERP_TRANSACTIONS_URL}
                                description={t.drawer.warehouse.transactions}
                            />
                            <DrawerSubMenuItem
                                url={EASY_ERP_ARTICLES_URL}
                                description={t.drawer.warehouse.articles}
                            />
                        </ul>

                        <DrawerMenuItem
                            description={t.drawer.customer.customers}
                        />
                        <ul className="flex flex-col gap-2">
                            <DrawerSubMenuItem
                                url={EASY_ERP_CUSTOMER_BASE_URL}
                                description={
                                    t.drawer.customer.customerManagement
                                }
                            />
                            <DrawerSubMenuItem
                                url={EASY_ERP_FIDELITY_CARD_BASE_URL}
                                description={t.drawer.customer.fidelityCards}
                            />
                        </ul>
                    </ul>
                </div>
            )}
        </div>
    );
}
