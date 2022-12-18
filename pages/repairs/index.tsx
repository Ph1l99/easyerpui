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

export default function Repairs() {
    const router = useRouter();
    const api = useApi();

    const [repairs, setRepairs] = useState([]);

    const navigateToRepairPage = function (barcode: string) {
        if (barcode) router.push(`${EASY_ERP_REPAIRS_URL}${barcode}`);
    };
    const openNewRepairPage = function () {
        navigateToRepairPage('-1');
    };
    const searchRepair = function (input: string) {
        console.log('Searching ', input); // todo
    };
    const loadRepairs = function () {
        api.authAxios
            .get(`${EASY_ERP_REPAIRS_BASE_URL}`)
            .then(response => {
                setRepairs(response.data.results);
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
                    loadRepairs();
                })
                .catch(() => {
                    toast.success('Error while deleting repair');
                });
        }
    };

    useEffect(() => {
        loadRepairs();
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
            {repairs.map((repair: any) => (
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
        </>
    );
}
