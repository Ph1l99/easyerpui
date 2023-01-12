import React from 'react';
import useTranslation from '../../../useTranslation';

export default function NoResults() {
    const { t } = useTranslation();
    return (
        <div className="h-full flex flex-col justify-center text-center">
            {t.genericComponents.pagination.noResults}
        </div>
    );
}
