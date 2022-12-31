import Pagination from './pagination';
import React from 'react';

type Props = {
    children?: React.ReactNode;
    next?: string;
    previous?: string;
    loadItems: Function;
};
export default function PaginatedContent({
    children,
    next,
    previous,
    loadItems,
}: Props) {
    return (
        <>
            <div className="h-[calc(100vh-19rem)] overflow-y-scroll">
                {children}
            </div>

            <Pagination
                handleNextPage={() => loadItems(next!.slice(4)!)}
                handlePreviousPage={() => loadItems(previous!.slice(4)!)}
                hasNextPage={!!next}
                hasPreviousPage={!!previous}
            />
        </>
    );
}
