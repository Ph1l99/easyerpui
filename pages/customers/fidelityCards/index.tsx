import SectionTitle from '../../../components/layout/sectionTitle';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import useApi from '../../../components/useApi';
import { EASY_ERP_FIDELITY_CARD_BASE_URL } from '../../../utils/urls';
import FidelityCardRow from '../../../components/layout/customers/fidelityCards/fidelityCardRow';
import SearchAdd from '../../../components/layout/searchAdd';
import toast from 'react-hot-toast';
import Modal from '../../../components/layout/modal';
import FidelityCardModal from '../../../components/layout/customers/fidelityCards/fidelityCardModal';
import PaginatedContent from '../../../components/layout/paginatedContent';
import { PaginationResult } from '../../../utils/types';

export default function FidelityCards() {
    const api = useApi();

    const [fidelityCards, setFidelityCards] = useState<PaginationResult>();
    const [isOpenModalFidelityCard, setIsOpenModalFidelityCard] =
        useState(false);
    const [selectedFidelityCard, setSelectedFidelityCard] = useState({
        barcode: '',
        is_active: false,
    });

    const loadFidelityCards = function (url: string) {
        api.authAxios
            .get(url)
            .then(response => {
                setFidelityCards(response.data);
            })
            .catch(() => {
                toast.error('Error while retrieving fidelity cards');
            });
    };

    const openModalFidelityCard = function (fidelityCard: any) {
        setSelectedFidelityCard(fidelityCard);
        setIsOpenModalFidelityCard(true);
    };

    const searchFidelityCard = function (input: string) {
        // todo
    };

    useEffect(() => {
        loadFidelityCards(`${EASY_ERP_FIDELITY_CARD_BASE_URL}`);
    }, []);

    return (
        <>
            <Head>
                <title>Tessere Fedeltà</title>
            </Head>
            <SectionTitle title="Tessere fedeltà" />
            <SearchAdd
                searchItem={searchFidelityCard}
                addItem={() => openModalFidelityCard(selectedFidelityCard)}
            ></SearchAdd>
            <PaginatedContent
                next={fidelityCards?.next}
                previous={fidelityCards?.previous}
                loadItems={loadFidelityCards}
            >
                {fidelityCards?.results!.map((fidelityCard: any) => (
                    <FidelityCardRow
                        key={fidelityCard.barcode}
                        fidelityCard={{
                            barcode: fidelityCard.barcode,
                            is_active: fidelityCard.is_active,
                        }}
                        editFidelityCard={() =>
                            openModalFidelityCard(fidelityCard)
                        }
                    ></FidelityCardRow>
                ))}
            </PaginatedContent>
            <FidelityCardModal
                isOpen={isOpenModalFidelityCard}
                onClose={(refresh: boolean) => {
                    setIsOpenModalFidelityCard(false);
                    setSelectedFidelityCard({ barcode: '', is_active: false });
                    if (refresh)
                        loadFidelityCards(`${EASY_ERP_FIDELITY_CARD_BASE_URL}`);
                }}
                fidelityCard={selectedFidelityCard}
            />
        </>
    );
}
