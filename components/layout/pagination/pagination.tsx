import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

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

    // prime tre pagine e ultime tre pagine da dove mi trovo in questo momento, se presenti
    return (
        <div className="flex justify-center items-center p-4 gap-3">
            <FontAwesomeIcon
                icon={faChevronLeft}
                size="lg"
                title="Pagina precedente"
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
                title="Pagina successiva"
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
