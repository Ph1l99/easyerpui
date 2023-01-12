import SectionTitle from '../../../components/layout/sectionTitle';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import useApi from '../../../components/useApi';
import { EASY_ERP_FIDELITY_CARD_BASE_URL } from '../../../utils/urls';
import FidelityCardRow from '../../../components/layout/customers/fidelityCards/fidelityCardRow';
import SearchAdd from '../../../components/layout/appLayout/search/searchAdd';
import FidelityCardModal from '../../../components/layout/customers/fidelityCards/fidelityCardModal';
import PaginatedContent from '../../../components/layout/appLayout/pagination/paginatedContent';
import { FidelityCard, PaginationResult } from '../../../utils/types';
import FilterBoxGroup from '../../../components/layout/appLayout/filtering/filterBoxGroup';
import useTranslation from '../../../components/useTranslation';
import { toastOnErrorApiResponse } from '../../../utils/toast';
import NoResults from '../../../components/layout/appLayout/pagination/noResults';

export default function FidelityCards() {
    const { authAxios } = useApi();
    const { t } = useTranslation();

    const [fidelityCards, setFidelityCards] = useState<PaginationResult>();
    const [isOpenModalFidelityCard, setIsOpenModalFidelityCard] =
        useState(false);
    const [selectedFidelityCard, setSelectedFidelityCard] =
        useState<FidelityCard>({});

    const [fidelityCardFilters, setFidelityCardFilters] = useState([
        {
            value: 'true',
            label: 'Attive',
            color: 'pink-400',
        },
    ]);

    const loadFidelityCards = function (url: string) {
        authAxios
            .get(url)
            .then(response => {
                setFidelityCards(response.data);
            })
            .catch(error => {
                toastOnErrorApiResponse(
                    error,
                    t.customers.fidelityCards.api.loadFidelityCardsError
                );
            });
    };

    const openModalFidelityCard = function (fidelityCard: any) {
        setSelectedFidelityCard(fidelityCard);
        setIsOpenModalFidelityCard(true);
    };

    const searchFidelityCard = function (input: string) {
        loadFidelityCards(`${EASY_ERP_FIDELITY_CARD_BASE_URL}?search=${input}`);
    };

    const searchFidelityCardFromFilters = function (values: Array<string>) {
        let url = values.join('&is_active=');

        if (values.length >= 1) {
            url = `?is_active=${url}`;
        }
        loadFidelityCards(`${EASY_ERP_FIDELITY_CARD_BASE_URL}${url}`);
    };

    useEffect(() => {
        loadFidelityCards(`${EASY_ERP_FIDELITY_CARD_BASE_URL}`);
    }, []);

    return (
        <>
            <Head>
                <title>{t.customers.fidelityCards.pageTitle}</title>
            </Head>
            <SectionTitle title={t.customers.fidelityCards.pageTitle} />
            <SearchAdd
                searchItem={searchFidelityCard}
                addItem={() => openModalFidelityCard(selectedFidelityCard)}
                buttonTitle={t.customers.fidelityCards.buttonAdd}
            />
            <div className="flex gap-4 text-white">
                <span className="text-black font-semibold">
                    {`${t.customers.fidelityCards.filter.title}:`}
                </span>
                <FilterBoxGroup
                    items={fidelityCardFilters}
                    search={searchFidelityCardFromFilters}
                />
            </div>
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
                    />
                ))}
                {fidelityCards?.results?.length === 0 && <NoResults />}
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
