import SectionTitle from '../../components/layout/sectionTitle';
import SearchAdd from '../../components/layout/searchAdd';
import { useRouter } from 'next/router';
import { EASY_ERP_REPAIRS_URL } from '../../utils/urls';
import RepairRow from '../../components/layout/repair/repairRow';
import useApi from '../../components/useApi';
import Head from 'next/head';
import React from 'react';

export default function Repairs() {
    const router = useRouter();
    const api = useApi();

    const navigateToRepairPage = function (barcode: string) {
        if (barcode) router.push(`${EASY_ERP_REPAIRS_URL}/${barcode}`);
    };
    const openNewRepairPage = function () {
        navigateToRepairPage('-1');
    };
    const searchRepair = function (input: string) {
        console.log('Searching ', input); // todo
    };
    const deleteRepair = function (barcode: string) {
        if (barcode) {
            api.authAxios
                .delete(`${EASY_ERP_REPAIRS_URL}/${barcode}`)
                .then(response => {
                    console.log('Deleted succesfully');
                    // todo download repairs
                })
                .catch(error => {
                    // todo error management
                });
        }
    };
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
            <RepairRow
                repair={{
                    title: 'Aspirapolvere cinese',
                    delivery_date: new Date(),
                    barcode: '123456789',
                    status: {
                        id: 1,
                        status: 'DA LAVORARE',
                        is_active: true,
                    },
                }}
                navigateToRepairPage={navigateToRepairPage}
                deleteRepair={deleteRepair}
            ></RepairRow>
        </>
    );
}
