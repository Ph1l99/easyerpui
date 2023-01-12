import SectionTitle from '../../../components/layout/sectionTitle';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import useApi from '../../../components/useApi';
import {
    EASY_ERP_ARTICLES_URL,
    EASY_ERP_INVENTORY_CYCLE_NEXT_URL,
    EASY_ERP_INVENTORY_CYCLE_URL,
} from '../../../utils/urls';
import clsx from 'clsx';
import InventoryRow from '../../../components/layout/warehouse/inventory/inventoryRow';
import PaginatedContent from '../../../components/layout/appLayout/pagination/paginatedContent';
import { PaginationResult } from '../../../utils/types';
import Search from '../../../components/layout/appLayout/search/search';
import useTranslation from '../../../components/useTranslation';
import {
    toastOnErrorApiResponse,
    toastOnSuccessApiResponse,
} from '../../../utils/toast';
import NoResults from '../../../components/layout/appLayout/pagination/noResults';

export default function Inventory() {
    const { authAxios } = useApi();
    const { t } = useTranslation();

    const [nextInventoryCycleDetails, setNextInventoryCycleDetails] = useState({
        last_inventory_cycle: '',
        next_inventory_cycle: '',
    });
    const [isEnabledInventoryCycleButton, setIsEnabledInventoryCycleButton] =
        useState(false);
    const [inventory, setInventory] = useState<PaginationResult>();

    const loadInventoryCycleDetails = function () {
        authAxios
            .get(`${EASY_ERP_INVENTORY_CYCLE_NEXT_URL}`)
            .then(response => {
                setNextInventoryCycleDetails(response.data);
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.warehouse.inventory.api.getInventoryCycleError
                );
            });
    };

    const loadInventory = function (url: string) {
        authAxios
            .get(url)
            .then(response => {
                setInventory(response.data);
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.warehouse.inventory.api.getInventoryError
                );
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
        authAxios
            .post(`${EASY_ERP_INVENTORY_CYCLE_URL}`)
            .then(response => {
                toastOnSuccessApiResponse(
                    response,
                    t.warehouse.inventory.api.createInventoryCycleSuccess
                );
                loadInventoryCycleDetails();
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.warehouse.inventory.api.createInventoryCycleError
                );
            });
    };

    const searchArticle = function (input: string) {
        loadInventory(`${EASY_ERP_ARTICLES_URL}?search=${input}`);
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
                <title>{t.warehouse.inventory.pageTitle}</title>
            </Head>
            <SectionTitle title={t.warehouse.inventory.pageTitle} />
            <div className="py-2 flex justify-between gap-1.5">
                <Search searchItem={searchArticle} />
                <input
                    type="button"
                    className={clsx(
                        'p-2 rounded-lg bg-fuchsia-600 text-white outline-none text-center cursor-pointer font-bold',
                        !isEnabledInventoryCycleButton
                            ? 'cursor-not-allowed'
                            : ''
                    )}
                    value={t.warehouse.inventory.buttonCycle.title}
                    readOnly={!isEnabledInventoryCycleButton}
                    disabled={!isEnabledInventoryCycleButton}
                    title={
                        `${t.warehouse.inventory.buttonCycle.lastCycle}: ` +
                        new Date(
                            nextInventoryCycleDetails.last_inventory_cycle
                        ).toLocaleDateString() +
                        '\n' +
                        `${t.warehouse.inventory.buttonCycle.nextCycle}: ` +
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
                {inventory?.results?.length === 0 && <NoResults />}
            </PaginatedContent>
        </>
    );
}
