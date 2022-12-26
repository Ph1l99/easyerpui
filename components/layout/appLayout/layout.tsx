import React, { useState } from 'react';
import Header from './header';
import Drawer from './drawer/drawer';
import clsx from 'clsx';

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    return (
        <div className="flex flex-col h-screen">
            <div className="basis-16">
                <Header
                    onOpenStateChange={setIsDrawerOpen}
                    isOpen={isDrawerOpen}
                />
            </div>
            <div className="flex flex-1">
                <div className={clsx(isDrawerOpen ? 'w-56' : '')}>
                    <Drawer isOpen={isDrawerOpen} />
                </div>
                <div className="flex-1 p-4">{children}</div>
            </div>
        </div>
    );
}
