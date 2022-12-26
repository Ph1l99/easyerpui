import { useAuth } from '../../useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Header({
    isOpen,
    onOpenStateChange,
}: {
    isOpen: boolean;
    onOpenStateChange: Function;
}) {
    const { user } = useAuth();

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
                <div className="flex items-center justify-center bg-gray-300 rounded-full w-8 h-8">
                    <FontAwesomeIcon icon={faUser} />
                </div>
            </div>
        </>
    );
}
