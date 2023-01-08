import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function Search({ searchItem }: { searchItem: Function }) {
    const [value, setValue] = useState<string>('');

    return (
        <>
            <input
                type="text"
                id="search-bar"
                className="px-2 py-1 bg-zinc-200 w-full rounded-md outline-none focus:outline focus:outline-offset-2 focus:outline-sky-900"
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
                    className="relative -left-9 top-1.5 pb-0.5 cursor-pointer"
                    onClick={() => {
                        setValue('');
                        searchItem('');
                        document.getElementById('search-bar')?.focus();
                    }}
                />
            )}
        </>
    );
}
