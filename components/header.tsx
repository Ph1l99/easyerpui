import { useAuth } from './useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

export default function Header() {
    const { user } = useAuth();

    return (
        <>
            <div className="flex flex-row justify-end bg-sky-900 h-12 py-2 pr-2">
                <div className="flex flex-column items-center justify-center bg-gray-300 rounded-full w-8">
                    <FontAwesomeIcon icon={faUser} />
                </div>
            </div>
        </>
    );
}
