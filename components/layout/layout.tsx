import React from 'react';
import Header from './header';
import Drawer from './drawer/drawer';

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <div className="flex">
            <Drawer />
            <div className="flex flex-col flex-1">
                <Header />
                <div className="flex-1 p-4">{children}</div>
            </div>
        </div>
    );
}
