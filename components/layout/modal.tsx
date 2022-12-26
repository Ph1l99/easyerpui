import React from 'react';

export default function Modal({
    isOpen,
    children,
    onClose,
}: {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: Function;
}) {
    return (
        <>
            {isOpen && (
                <div className="relative z-10" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white p-4">{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
