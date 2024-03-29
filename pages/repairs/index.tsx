import SectionTitle from '../../components/layout/sectionTitle';
import SearchAdd from '../../components/layout/appLayout/search/searchAdd';
import { useRouter } from 'next/router';
import {
    EASY_ERP_REPAIR_STATUS_URL,
    EASY_ERP_REPAIRS_BASE_URL,
    EASY_ERP_REPAIRS_URL,
} from '../../utils/urls';
import RepairRow from '../../components/layout/repair/repairRow';
import useApi from '../../components/useApi';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import PaginatedContent from '../../components/layout/appLayout/pagination/paginatedContent';
import { PaginationResult, RepairInfo } from '../../utils/types';
import FilterBoxGroup from '../../components/layout/appLayout/filtering/filterBoxGroup';
import useTranslation from '../../components/useTranslation';
import {
    toastOnErrorApiResponse,
    toastOnSuccessApiResponse,
} from '../../utils/toast';
import NoResults from '../../components/layout/appLayout/pagination/noResults';
import Modal from '../../components/layout/modal';

export default function Repairs() {
    const router = useRouter();
    const { authAxios } = useApi();
    const { t } = useTranslation();

    const [repairs, setRepairs] = useState<PaginationResult>();
    const [repairStatuses, setRepairStatuses] = useState<any>([]);
    const [isModalDeleteRepairOpen, setIsModalDeleteRepairOpen] =
        useState(false);
    const [modalDeleteRepairInfo, setModalDeleteRepairInfo] =
        useState<RepairInfo>({});

    const navigateToRepairPage = function (barcode: string) {
        if (barcode) router.push(`${EASY_ERP_REPAIRS_URL}${barcode}`);
    };
    const openNewRepairPage = function () {
        navigateToRepairPage('-1');
    };
    const searchRepair = function (input: string) {
        authAxios
            .get(`${EASY_ERP_REPAIRS_URL}${input}`)
            .then(response => {
                if (response.data) {
                    router.push(`${EASY_ERP_REPAIRS_URL}${input}`);
                }
            })
            .catch(error => {
                toastOnErrorApiResponse(error, t.repairs.api.getRepairError);
            });
    };
    const searchRepairFromFilters = function (values: Array<string>) {
        // todo save filters local storage
        let url = values.join('&status=');

        if (values.length >= 1) {
            url = `?status=${url}`;
        }

        loadRepairs(`${EASY_ERP_REPAIRS_URL}${url}`);
    };
    const loadRepairStatuses = function () {
        authAxios
            .get(EASY_ERP_REPAIR_STATUS_URL)
            .then(response => {
                setRepairStatuses(
                    response.data.map((x: any) => ({
                        value: x.id,
                        label: x.status,
                        color: x.class_name,
                    }))
                );
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.repairs.api.getRepairStatusError
                );
            });
    };
    const loadRepairs = function (url: string) {
        authAxios
            .get(url)
            .then(response => {
                setRepairs(response.data);
            })
            .catch(error => {
                toastOnErrorApiResponse(error, t.repairs.api.getRepairsError);
            });
    };
    const deleteRepair = function (barcode: string) {
        if (barcode) {
            authAxios
                .delete(`${EASY_ERP_REPAIRS_URL}${barcode}`)
                .then(response => {
                    toastOnSuccessApiResponse(
                        response,
                        t.repairs.api.deleteRepairSuccess
                    );
                    loadRepairs(`${EASY_ERP_REPAIRS_BASE_URL}/`);
                })
                .catch(error => {
                    toastOnErrorApiResponse(
                        error,
                        t.repairs.api.deleteRepairError
                    );
                });
        }
    };
    const openModalDeleteRepair = function (repair: RepairInfo) {
        setIsModalDeleteRepairOpen(true);
        setModalDeleteRepairInfo(repair);
    };

    const closeModalDelete = function () {
        setIsModalDeleteRepairOpen(false);
        setModalDeleteRepairInfo({});
    };

    useEffect(() => {
        loadRepairStatuses();
        loadRepairs(`${EASY_ERP_REPAIRS_BASE_URL}/`);
    }, []);

    return (
        <>
            <Head>
                <title>{t.repairs.pageTitle}</title>
            </Head>
            <SectionTitle title={t.repairs.pageTitle} />
            <SearchAdd
                addItem={openNewRepairPage}
                searchItem={searchRepair}
                buttonTitle={t.repairs.buttonAdd}
            />

            <div className="flex gap-4 text-white">
                <span className="text-black font-semibold">
                    {`${t.repairs.filter.title}: `}
                </span>
                <FilterBoxGroup
                    items={repairStatuses}
                    search={searchRepairFromFilters}
                />
            </div>
            <PaginatedContent
                next={repairs?.next}
                previous={repairs?.previous}
                loadItems={loadRepairs}
            >
                {repairs?.results?.map((repair: RepairInfo) => (
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
                        deleteRepair={openModalDeleteRepair}
                    />
                ))}
                {repairs?.results?.length === 0 && <NoResults />}
            </PaginatedContent>
            <Modal
                isOpen={isModalDeleteRepairOpen}
                title={`${t.repairs.deleteModal.title}: ${modalDeleteRepairInfo.title}`}
                onClose={closeModalDelete}
            >
                <div className="mb-4">{t.repairs.deleteModal.content}</div>
                <hr />
                <div className="flex flex-row justify-end mt-4">
                    <input
                        type="button"
                        value={t.genericComponents.buttons.delete}
                        className="basis-2/12 py-1 px-1 rounded-lg bg-green-600 text-white outline-none mr-4 text-center h-fit font-bold cursor-pointer"
                        onClick={() => {
                            deleteRepair(modalDeleteRepairInfo.barcode!);
                            closeModalDelete();
                        }}
                    />
                    <input
                        type="button"
                        value={t.genericComponents.buttons.cancel}
                        className="basis-2/12 py-1 px-1 rounded-lg bg-red-600 text-white outline-none text-center h-fit cursor-pointer font-bold"
                        onClick={closeModalDelete}
                    />
                </div>
            </Modal>
        </>
    );
}
