import SectionTitle from '../../components/layout/sectionTitle';
import SearchAdd from '../../components/layout/searchAdd';
import { useRouter } from 'next/router';
import {
    EASY_ERP_REPAIRS_BASE_URL,
    EASY_ERP_REPAIRS_URL,
} from '../../utils/urls';
import RepairRow from '../../components/layout/repair/repairRow';
import useApi from '../../components/useApi';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PaginatedContent from '../../components/layout/paginatedContent';
import { PaginationResult, Repair } from '../../utils/types';
import clsx from 'clsx';

export default function Repairs() {
    const router = useRouter();
    const api = useApi();
    const [filters, setFilters] = useState({});

    const [repairs, setRepairs] = useState<PaginationResult>();

    const navigateToRepairPage = function (barcode: string) {
        if (barcode) router.push(`${EASY_ERP_REPAIRS_URL}${barcode}`);
    };
    const openNewRepairPage = function () {
        navigateToRepairPage('-1');
    };
    const searchRepair = function (input: string) {
        console.log('Searching ', input); // todo
    };
    const loadRepairs = function (url: string) {
        api.authAxios
            .get(url)
            .then(response => {
                setRepairs(response.data);
            })
            .catch(() => {
                toast.error('Error while loading repairs');
            });
    };
    const deleteRepair = function (barcode: string) {
        if (barcode) {
            api.authAxios
                .delete(`${EASY_ERP_REPAIRS_URL}/${barcode}`)
                .then(() => {
                    toast.success('Repair deleted succesfully');
                    loadRepairs(EASY_ERP_REPAIRS_BASE_URL);
                })
                .catch(() => {
                    toast.success('Error while deleting repair');
                });
        }
    };

    useEffect(() => {
        loadRepairs(EASY_ERP_REPAIRS_BASE_URL);
    }, []);

    return (
        <>
            <Head>
                <title>Riparazioni</title>
            </Head>
            <SectionTitle title="Riparazioni"></SectionTitle>
            <SearchAdd
                addItem={openNewRepairPage}
                searchItem={searchRepair}
            ></SearchAdd>

            <div className="flex gap-4 text-white">
                <span className="text-black font-semibold">Filtra per:</span>
                <p
                    className={clsx(
                        'uppercase px-3 bg-indigo-600 rounded-md cursor-pointer'
                    )}
                >
                    Da consegnare
                </p>
                <p className="uppercase px-3 bg-red-600 rounded-md cursor-pointer outline outline-red-600 outline-offset-2">
                    Da consegnare
                </p>
                <p className="uppercase px-3 bg-green-600 rounded-md cursor-pointer outline outline-green-600 outline-offset-2">
                    Da consegnare
                </p>
            </div>
            <PaginatedContent
                next={repairs?.next}
                previous={repairs?.previous}
                loadItems={loadRepairs}
            >
                {repairs?.results?.map((repair: Repair) => (
                    <RepairRow
                        key={repair.barcode}
                        repair={{
                            barcode: repair.barcode,
                            title: repair.title,
                            description: repair.description,
                            delivery_date: repair.delivery_date,
                            status: repair.status,
                        }}
                        navigateToRepairPage={navigateToRepairPage}
                        deleteRepair={deleteRepair}
                    />
                ))}
            </PaginatedContent>
        </>
    );
}
