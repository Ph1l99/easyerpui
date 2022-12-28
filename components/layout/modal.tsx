import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

export default function Modal({
    isOpen,
    title,
    children,
    onClose,
    width,
}: {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onClose: Function;
    width: string;
}) {
    return (
        <>
            {isOpen && (
                <div className="relative z-10" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div
                                className={clsx(
                                    'relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8',
                                    width !== ''
                                        ? width
                                        : 'sm:w-full sm:max-w-lg'
                                )}
                            >
                                <div className="basis-1/12 flex flex-row p-4 justify-between">
                                    <span className="basis-11/12 font-bold">
                                        {title}
                                    </span>
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className="text-gray-600 cursor-pointer"
                                        onClick={() => onClose()}
                                    />
                                </div>
                                <hr className="mx-4" />
                                <div className="bg-white p-4">{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
