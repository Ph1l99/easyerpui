import Link from 'next/link';
import {
    EASY_ERP_ARTICLES_URL,
    EASY_ERP_INVENTORY_URL,
    EASY_ERP_REPAIRS_BASE_URL,
    EASY_ERP_TRANSACTIONS_URL,
} from '../utils/urls';

export default function Drawer() {
    return (
        <>
            <div className="flex flex-col bg-sky-900 w-56 text-white font-light">
                <div className="ml-4 mt-5">
                    <ul className="space-y-3.5">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            Magazzino
                            <ul className="space-y-1.5">
                                <li>
                                    <Link href={EASY_ERP_INVENTORY_URL}>
                                        Inventario
                                    </Link>
                                </li>
                                <li>
                                    <Link href={EASY_ERP_TRANSACTIONS_URL}>
                                        Movimentazioni
                                    </Link>
                                </li>
                                <li>
                                    <Link href={EASY_ERP_ARTICLES_URL}>
                                        Articoli
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link href={EASY_ERP_REPAIRS_BASE_URL}>
                                Riparazioni
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
