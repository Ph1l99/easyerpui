import SectionTitle from '../../../components/layout/sectionTitle';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import useApi from '../../../components/useApi';
import { EASY_ERP_FIDELITY_CARD_BASE_URL } from '../../../utils/urls';
import FidelityCardRow from '../../../components/layout/customers/fidelityCards/fidelityCardRow';
import SearchAdd from '../../../components/layout/searchAdd';

export default function FidelityCards() {
    const api = useApi();

    const [fidelityCards, setFidelityCards] = useState([]);

    const loadFidelityCards = function () {
        api.authAxios.get(EASY_ERP_FIDELITY_CARD_BASE_URL).then(response => {
            setFidelityCards(response.data.results);
        });
    };

    const openModalFidelityCard = function (barcode: string) {
        // todo
    };

    const searchFidelityCard = function (input: string) {
        // todo
    };

    useEffect(() => {
        loadFidelityCards();
    }, []);

    return (
        <>
            <Head>
                <title>Tessere Fedeltà</title>
            </Head>
            <SectionTitle title="Tessere fedeltà" />
            <SearchAdd
                searchItem={searchFidelityCard}
                addItem={openModalFidelityCard}
            ></SearchAdd>
            {fidelityCards.map((fidelityCard: any) => (
                <FidelityCardRow
                    key={fidelityCard.barcode}
                    fidelityCard={{
                        barcode: fidelityCard.barcode,
                        is_active: fidelityCard.is_active,
                    }}
                    editFidelityCard={openModalFidelityCard}
                ></FidelityCardRow>
            ))}
        </>
    );
}
