import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function Search({ searchItem }: { searchItem: Function }) {
    const [value, setValue] = useState<string>('');

    return (
        <div className="flex px-2 py-1 bg-zinc-200 w-full rounded-md outline-none focus-within:outline focus-within:outline-offset-2 focus-within:outline-sky-900">
            <input
                type="text"
                id="search-bar"
                className="bg-zinc-200 w-full outline-none"
                autoFocus
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={e => {
                    if (e.key == 'Enter') {
                        searchItem(value);
                    }
                }}
            />
            {value !== '' && (
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    size="lg"
                    className="pt-0.5 text-gray-600 cursor-pointer  "
                    onClick={() => {
                        setValue('');
                        searchItem('');
                        document.getElementById('search-bar')?.focus();
                    }}
                />
            )}
        </div>
    );
}
