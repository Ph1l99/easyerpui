import { useAuth } from '../../useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
    faAt,
    faBars,
    faCircleUser,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import useTranslation from '../../useTranslation';

export default function Header({
    isOpen,
    onOpenStateChange,
}: {
    isOpen: boolean;
    onOpenStateChange: Function;
}) {
    const { user, logout, getProfileInfo } = useAuth();
    const { t } = useTranslation();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    useEffect(() => {
        if (isUserMenuOpen && !user?.username) getProfileInfo();
    }, [isUserMenuOpen]);

    return (
        <>
            <div className="flex justify-between items-center bg-sky-900 pr-2 h-full">
                <div className="flex flex-row justify-start items-center pl-4 text-white">
                    <FontAwesomeIcon
                        icon={faBars}
                        className="cursor-pointer"
                        onClick={() => {
                            onOpenStateChange(!isOpen);
                        }}
                    />
                    <h1 className="text-upper ml-6 font-bold text-lg">
                        EASY ERP
                    </h1>
                </div>
                <div
                    className="flex items-center justify-center text-white rounded-full w-10 h-10 cursor-pointer"
                    onClick={() => {
                        setIsUserMenuOpen(prevState => !prevState);
                    }}
                >
                    <FontAwesomeIcon icon={faCircleUser} size="2xl" />
                </div>
                {isUserMenuOpen && (
                    <div className="absolute w-52 top-8 right-1 px-5 py-3 bg-white rounded-lg shadow border mt-5">
                        <ul className="space-y-3">
                            <li>
                                <FontAwesomeIcon icon={faUser} />
                                <span className="pl-2">
                                    {user?.firstName} {user?.lastName}
                                </span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faAt} />
                                <span className="pl-2">{user?.username}</span>
                            </li>
                            <hr />
                            <li
                                className="cursor-pointer"
                                onClick={() => {
                                    logout();
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faRightFromBracket}
                                    className="text-red-600"
                                />
                                <span className="h-full pl-2">
                                    {t.header.profile.logout}
                                </span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
