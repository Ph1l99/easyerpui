import SectionTitle from '../../../components/layout/sectionTitle';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import useApi from '../../../components/useApi';
import {
    EASY_ERP_ARTICLES_URL,
    EASY_ERP_INVENTORY_CYCLE_NEXT_URL,
    EASY_ERP_INVENTORY_CYCLE_URL,
    EASY_ERP_INVENTORY_URL,
} from '../../../utils/urls';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import InventoryRow from '../../../components/layout/warehouse/inventory/inventoryRow';
import PaginatedContent from '../../../components/layout/pagination/paginatedContent';
import { PaginationResult } from '../../../utils/types';

export default function Inventory() {
    const api = useApi();

    const [nextInventoryCycleDetails, setNextInventoryCycleDetails] = useState({
        last_inventory_cycle: '',
        next_inventory_cycle: '',
    });
    const [isEnabledInventoryCycleButton, setIsEnabledInventoryCycleButton] =
        useState(false);
    const [inventory, setInventory] = useState<PaginationResult>();

    const loadInventoryCycleDetails = function () {
        api.authAxios
            .get(`${EASY_ERP_INVENTORY_CYCLE_NEXT_URL}`)
            .then(response => {
                setNextInventoryCycleDetails(response.data);
            })
            .catch(() => {
                toast.error('Error while loading inventory cycle details');
            });
    };

    const loadInventory = function (url: string) {
        api.authAxios
            .get(url)
            .then(response => {
                setInventory(response.data);
            })
            .catch(() => {
                toast.error('Error while loading inventory');
            });
    };

    const computeInventoryCycleOptions = function () {
        if (
            nextInventoryCycleDetails.next_inventory_cycle == null ||
            new Date(nextInventoryCycleDetails.next_inventory_cycle) <=
                new Date()
        ) {
            setIsEnabledInventoryCycleButton(true);
        }
    };

    const executeInventoryCycle = function () {
        api.authAxios
            .post(`${EASY_ERP_INVENTORY_CYCLE_URL}`)
            .then(response => {
                toast.success('Inventory cycle executed succesfully');
                loadInventoryCycleDetails();
            })
            .catch(() => {
                toast.error('Error while computing inventory cycle');
            });
    };

    useEffect(() => {
        loadInventoryCycleDetails();
        loadInventory(`${EASY_ERP_ARTICLES_URL}`);
    }, []);

    useEffect(() => {
        computeInventoryCycleOptions();
    }, [nextInventoryCycleDetails]);

    return (
        <>
            <Head>
                <title>Inventario</title>
            </Head>
            <SectionTitle title="Inventario"></SectionTitle>
            <div className="basis-1/12 flex justify-end -mt-5 py-4">
                <input
                    type="button"
                    className={clsx(
                        'p-2 rounded-lg bg-fuchsia-600 text-white outline-none h-fit text-center cursor-pointer font-bold',
                        !isEnabledInventoryCycleButton
                            ? 'cursor-not-allowed'
                            : ''
                    )}
                    value="Storicizza inventario"
                    readOnly={!isEnabledInventoryCycleButton}
                    disabled={!isEnabledInventoryCycleButton}
                    title={
                        'Ultima storicizzazione: ' +
                        new Date(
                            nextInventoryCycleDetails.last_inventory_cycle
                        ).toLocaleDateString() +
                        '\nProssima storicizzazione: ' +
                        new Date(
                            nextInventoryCycleDetails.next_inventory_cycle
                        ).toLocaleDateString()
                    }
                    onClick={executeInventoryCycle}
                />
            </div>
            <PaginatedContent
                next={inventory?.next}
                previous={inventory?.previous}
                loadItems={loadInventory}
            >
                {inventory?.results!.map(inventoryItem => (
                    <InventoryRow
                        key={inventoryItem.barcode}
                        inventoryArticle={{
                            barcode: inventoryItem.barcode,
                            name: inventoryItem.name,
                            current_availability:
                                inventoryItem.current_availability,
                        }}
                    />
                ))}
            </PaginatedContent>
        </>
    );
}
