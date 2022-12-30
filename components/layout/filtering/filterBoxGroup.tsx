import { useEffect, useState } from 'react';
import FilterBox, { FilterBoxProps } from './filterBox';

type Props = {
    items: FilterBoxGroupProps[];
    search: Function;
};

type FilterBoxGroupProps = { value: string; label: string; color: string };

export default function FilterBoxGroup({ items, search }: Props) {
    const [filterBoxes, setFilterBoxes] = useState<FilterBoxProps[]>([]);

    const handleFilterChange = function (value: string) {
        const updatedFilterBoxes = filterBoxes.map(filterBox => {
            if (filterBox.value === value) {
                return { ...filterBox, isActive: !filterBox.isActive };
            }
            return filterBox;
        });
        setFilterBoxes(updatedFilterBoxes);
    };

    useEffect(() => {
        setFilterBoxes(
            items.map(item => ({ isActive: false, search: search, ...item }))
        );
    }, [items]);

    useEffect(() => {
        search(filterBoxes.filter(x => x.isActive).map(x => x.value));
    }, [filterBoxes]);

    return (
        <>
            {filterBoxes?.map(filterBox => (
                <FilterBox
                    key={filterBox.value}
                    {...filterBox}
                    search={handleFilterChange}
                />
            ))}
        </>
    );
}
