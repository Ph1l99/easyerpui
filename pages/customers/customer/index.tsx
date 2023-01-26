import SectionTitle from '../../../components/layout/sectionTitle';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
    EASY_ERP_CUSTOMER_BASE_URL,
    EASY_ERP_CUSTOMERS_BASE_URL,
} from '../../../utils/urls';
import SearchAdd from '../../../components/layout/appLayout/search/searchAdd';
import useApi from '../../../components/useApi';
import CustomerRow from '../../../components/layout/customers/customer/customerRow';
import PaginatedContent from '../../../components/layout/appLayout/pagination/paginatedContent';
import {
    ListCustomer,
    PaginationResult,
    RepairInfo,
} from '../../../utils/types';
import useTranslation from '../../../components/useTranslation';
import {
    toastOnErrorApiResponse,
    toastOnSuccessApiResponse,
} from '../../../utils/toast';
import NoResults from '../../../components/layout/appLayout/pagination/noResults';
import Modal from '../../../components/layout/modal';

export default function Customer() {
    const router = useRouter();
    const { authAxios } = useApi();
    const { t } = useTranslation();

    const [customers, setCustomers] = useState<PaginationResult>();
    const [isModalDeleteCustomerOpen, setIsModalDeleteCustomerOpen] =
        useState(false);
    const [modalDeleteCustomerInfo, setModalDeleteCustomerInfo] =
        useState<ListCustomer>({});

    const navigateToCustomer = function (id: Number) {
        if (id) {
            router.push(`${EASY_ERP_CUSTOMER_BASE_URL}/${id}`);
        }
    };

    const addNewCustomer = function () {
        navigateToCustomer(-1);
    };

    const searchCustomer = function (input: string) {
        loadCustomers(`${EASY_ERP_CUSTOMERS_BASE_URL}?search=${input}`);
    };

    const deleteCustomer = function (id: Number) {
        if (id) {
            authAxios
                .delete(`${EASY_ERP_CUSTOMER_BASE_URL}/${id}`)
                .then(response => {
                    toastOnSuccessApiResponse(
                        response,
                        t.customers.customer.api.deleteCustomerSuccess
                    );
                    loadCustomers(`${EASY_ERP_CUSTOMERS_BASE_URL}/`);
                })
                .catch(error => {
                    toastOnErrorApiResponse(
                        error,
                        t.customers.customer.api.deleteCustomerError
                    );
                });
        }
    };

    const loadCustomers = function (url: string) {
        authAxios
            .get(url)
            .then(response => setCustomers(response.data))
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.customers.customer.api.getCustomersError
                );
            });
    };

    const openModalDeleteRepair = function (customer: ListCustomer) {
        setIsModalDeleteCustomerOpen(true);
        setModalDeleteCustomerInfo(customer);
    };

    const closeModalDelete = function () {
        setIsModalDeleteCustomerOpen(false);
        setModalDeleteCustomerInfo({});
    };

    useEffect(() => {
        loadCustomers(`${EASY_ERP_CUSTOMERS_BASE_URL}/`);
    }, []);

    return (
        <>
            <Head>
                <title>{t.customers.customer.pageTitle}</title>
            </Head>
            <SectionTitle title={t.customers.customer.pageTitle} />
            <SearchAdd
                addItem={addNewCustomer}
                searchItem={searchCustomer}
                buttonTitle={t.customers.customer.buttonAdd}
            />
            <PaginatedContent
                next={customers?.next}
                previous={customers?.previous}
                loadItems={loadCustomers}
            >
                {customers?.results!.map((customer: any) => (
                    <CustomerRow
                        key={customer.id}
                        customer={{
                            id: customer.id,
                            first_name: customer.first_name,
                            last_name: customer.last_name,
                            fidelity_card: customer.fidelity_card,
                        }}
                        deleteCustomer={openModalDeleteRepair}
                        navigateToCustomerPage={navigateToCustomer}
                    />
                ))}
                {customers?.results?.length === 0 && <NoResults />}
            </PaginatedContent>
            <Modal
                isOpen={isModalDeleteCustomerOpen}
                title={`${t.customers.customer.modal.title}: ${modalDeleteCustomerInfo.last_name} - ${modalDeleteCustomerInfo.first_name}`}
                onClose={closeModalDelete}
            >
                <div className="mb-4">{t.customers.customer.modal.content}</div>
                <hr />
                <div className="flex flex-row justify-end mt-4">
                    <input
                        type="button"
                        value={t.genericComponents.buttons.delete}
                        className="basis-2/12 py-1 px-1 rounded-lg bg-green-600 text-white outline-none mr-4 text-center h-fit font-bold cursor-pointer"
                        onClick={() => {
                            deleteCustomer(modalDeleteCustomerInfo.id!);
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
