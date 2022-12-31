import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function AddButton({
    addItem,
    buttonTitle,
}: {
    addItem: Function;
    buttonTitle: string;
}) {
    return (
        <div
            className="flex flex-col w-20 bg-green-600 text-white rounded-lg justify-center cursor-pointer"
            onClick={() => addItem()}
        >
            <FontAwesomeIcon
                icon={faPlus}
                className="fa-lg"
                title={buttonTitle}
            ></FontAwesomeIcon>
        </div>
    );
}
