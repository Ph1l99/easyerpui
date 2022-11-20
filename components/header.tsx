import { useAuth } from './useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const { user } = useAuth();

    return (
        <>
            <div className="flex flex-row justify-between bg-sky-900 h-12">
                <div className="flex flex-row justify-start items-center pl-2 text-white">
                    <FontAwesomeIcon icon={faBars} />
                    <h1 className="text-upper ml-6">EASY ERP</h1>
                </div>
                <div className="flex flex-row justify-end py-2 pr-2">
                    <div className="flex flex-column items-center justify-center bg-gray-300 rounded-full w-8">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                </div>
            </div>
        </>
    );
}
