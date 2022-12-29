import Pagination from './pagination';
import React from 'react';
import { PaginationResult } from '../../utils/types';

type Props = {
    children?: React.ReactNode;
    items?: PaginationResult;
    loadItems: Function;
};
export default function PaginatedContent({
    children,
    items,
    loadItems,
}: Props) {
    return (
        <>
            <div className="h-[calc(100vh-18rem)] overflow-y-scroll">
                {children}
            </div>

            <Pagination
                handleNextPage={() => loadItems(items?.next!.slice(4)!)}
                handlePreviousPage={() => loadItems(items?.previous!.slice(4)!)}
                hasNextPage={!!items?.next}
                hasPreviousPage={!!items?.previous}
            />
        </>
    );
}
