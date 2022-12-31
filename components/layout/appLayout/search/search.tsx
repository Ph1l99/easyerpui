import { useState } from 'react';

export default function Search({ searchItem }: { searchItem: Function }) {
    const [value, setValue] = useState<string>('');

    return (
        <input
            type="text"
            className="px-2 py-1 bg-zinc-200 w-full rounded-md outline-none focus:outline focus:outline-offset-2 focus:outline-sky-900"
            autoFocus
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => {
                if (e.key == 'Enter') {
                    searchItem(value);
                }
            }}
        />
    );
}
