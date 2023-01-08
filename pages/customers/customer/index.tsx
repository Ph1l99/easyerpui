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
import toast from 'react-hot-toast';
import PaginatedContent from '../../../components/layout/appLayout/pagination/paginatedContent';
import { PaginationResult } from '../../../utils/types';
import useTranslation from '../../../components/useTranslation';

export default function Customer() {
    const router = useRouter();
    const api = useApi();
    const { t } = useTranslation();

    const [customers, setCustomers] = useState<PaginationResult>();

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
            api.authAxios
                .delete(`${EASY_ERP_CUSTOMER_BASE_URL}/${id}`)
                .then(() => {
                    toast.success('Customer deleted succesfully');
                    loadCustomers(`${EASY_ERP_CUSTOMERS_BASE_URL}`);
                })
                .catch(() => {});
        }
    };

    const loadCustomers = function (url: string) {
        api.authAxios
            .get(url)
            .then(response => setCustomers(response.data))
            .catch(() => {
                toast.error('Error while loading customers');
            });
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
                        deleteCustomer={deleteCustomer}
                        navigateToCustomerPage={navigateToCustomer}
                    />
                ))}
            </PaginatedContent>
        </>
    );
}
