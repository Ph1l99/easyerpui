import SectionTitle from '../../../components/layout/sectionTitle';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
    EASY_ERP_CUSTOMER_BASE_URL,
    EASY_ERP_CUSTOMERS_BASE_URL,
} from '../../../utils/urls';
import SearchAdd from '../../../components/layout/searchAdd';
import useApi from '../../../components/useApi';
import CustomerRow from '../../../components/layout/customer/customerRow';

export default function Customer() {
    const router = useRouter();
    const api = useApi();

    const [customers, setCustomers] = useState([]);

    const navigateToCustomer = function (id: Number) {
        if (id) {
            router.push(`${EASY_ERP_CUSTOMER_BASE_URL}/${id}`);
        }
    };

    const addNewCustomer = function () {
        navigateToCustomer(-1);
    };

    const searchCustomer = function (input: string) {
        // todo
    };

    const deleteCustomer = function (id: Number) {
        // todo
    };

    const loadCustomers = function () {
        api.authAxios
            .get(EASY_ERP_CUSTOMERS_BASE_URL)
            .then(response => setCustomers(response.data.results))
            .catch(() => {});
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    return (
        <>
            <Head>
                <title>Clienti</title>
            </Head>
            <SectionTitle title="Clienti" />
            <SearchAdd
                addItem={addNewCustomer}
                searchItem={searchCustomer}
            ></SearchAdd>
            {customers.map((customer: any) => (
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
                ></CustomerRow>
            ))}
        </>
    );
}
