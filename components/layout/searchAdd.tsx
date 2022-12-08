import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

export default function SearchAdd({
    searchItem,
    addItem,
}: {
    searchItem: Function;
    addItem: Function;
}) {
    const inputValueRef = useRef<HTMLInputElement>(null);

    return (
        <div className="py-4 flex justify-between h-15 gap-1.5">
            <input
                type="text"
                className="px-2 py-1 bg-zinc-200 w-full rounded-md outline-none focus:outline focus:outline-offset-2 focus:outline-sky-900"
                ref={inputValueRef}
                autoFocus
                onChange={() => searchItem(inputValueRef.current?.value)}
            />
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
