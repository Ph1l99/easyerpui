import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import useTranslation from '../../../useTranslation';

type Props = {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
};

export default function Pagination({
    hasPreviousPage,
    hasNextPage,
    handlePreviousPage,
    handleNextPage,
}: Props) {
    const { t } = useTranslation();

    const [currentPage, setCurrentPage] = useState(1);

    const goToPreviousPage = function () {
        if (hasPreviousPage) {
            setCurrentPage(currentPage - 1);
            handlePreviousPage();
        }
    };
    const goToNextPage = function () {
        if (hasNextPage) {
            setCurrentPage(currentPage + 1);
            handleNextPage();
        }
    };

    return (
        <div className="flex justify-center items-center p-4 gap-3">
            <FontAwesomeIcon
                icon={faChevronLeft}
                size="lg"
                title={t.genericComponents.pagination.previousPage}
                className={clsx(
                    hasPreviousPage
                        ? 'cursor-pointer'
                        : 'text-gray-300 cursor-not-allowed'
                )}
                onClick={goToPreviousPage}
            />
            {currentPage}
            <FontAwesomeIcon
                icon={faChevronRight}
                size="lg"
                title={t.genericComponents.pagination.nextPage}
                className={clsx(
                    hasNextPage
                        ? 'cursor-pointer'
                        : 'text-gray-300 cursor-not-allowed'
                )}
                onClick={goToNextPage}
            />
        </div>
    );
}
