import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Search from './search';

export default function SearchAdd({
    searchItem,
    addItem,
}: {
    searchItem: Function;
    addItem: Function;
}) {
    const [value, setValue] = useState<string>('');
    // const debouncedValue = useDebounce<string>(value, 500);

    // useEffect(() => {
    //     searchItem(debouncedValue);
    // }, [debouncedValue]);

    return (
        <div className="py-4 flex justify-between h-16 gap-1.5">
            <Search searchItem={searchItem} />
            <div
                className="flex flex-col w-20 bg-green-600 text-white rounded-lg justify-center cursor-pointer"
                onClick={() => addItem()}
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    className="fa-lg"
                ></FontAwesomeIcon>
            </div>
        </div>
    );
}
