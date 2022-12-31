import clsx from 'clsx';
import React from 'react';

export type FilterBoxProps = {
    value: string;
    label: string;
    color: string;
    isActive: boolean;
    search: Function;
};

export default function FilterBox({
    value,
    label,
    color,
    isActive,
    search,
}: FilterBoxProps) {
    const toggleFilter = function () {
        search(value);
    };

    return (
        <span
            onClick={toggleFilter}
            className={clsx(
                'uppercase px-3 rounded-md cursor-pointer',
                `bg-${color}`,
                isActive ? `outline outline-offset-2 outline-${color}` : null
            )}
        >
            {label}
        </span>
    );
}
