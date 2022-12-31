import { useState } from 'react';
import Search from './search';
import AddButton from './addButton';

export default function SearchAdd({
    searchItem,
    addItem,
    buttonTitle,
}: {
    searchItem: Function;
    addItem: Function;
    buttonTitle: string;
}) {
    const [value, setValue] = useState<string>('');
    // const debouncedValue = useDebounce<string>(value, 500);

    // useEffect(() => {
    //     searchItem(debouncedValue);
    // }, [debouncedValue]);

    return (
        <div className="py-4 flex justify-between h-16 gap-1.5">
            <Search searchItem={searchItem} />
            <AddButton addItem={addItem} buttonTitle={buttonTitle} />
        </div>
    );
}
