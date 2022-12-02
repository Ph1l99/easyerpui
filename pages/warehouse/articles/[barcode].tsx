import { useRouter } from 'next/router';
import { useState } from 'react';
import useApi from '../../../components/useApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

export default function Article() {
    const router = useRouter();
    const api = useApi();

    const [article, setArticle] = useState({
        name: '',
        description: '',
        barcode: '',
        is_active: true,
        reorder_threshold: 0,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isNewArticle, setIsNewArticle] = useState(true);

    const loadArticleData = () => {
        api.authAxios.get(router.asPath).then(response => {
            setArticle(response.data);
        });
    };

    return (
        <>
            <div className="flex flex-col p-8 h-full">
                <div className="basis-1 /12 font-bold text-xl">Articolo</div>

                <div className="basis-1/12 flex justify-end">
                    {isEditing && (
                        <>
                            <input
                                type="button"
                                value="Salva"
                                className="basis-1/12 rounded-lg bg-green-600 text-white outline-none mr-4 text-center h-8"
                            />
                            <input
                                type="button"
                                value="Annulla"
                                className="basis-1/12 rounded-lg bg-red-600 text-white outline-none text-center h-8"
                            />
                        </>
                    )}
                </div>
                <div className="basis-1/12 text-right">
                    <FontAwesomeIcon
                        className="mx-2 fa-xl cursor-pointer"
                        icon={faTag}
                        title="Stampa etichetta"
                    ></FontAwesomeIcon>
                </div>
                <div className="basis-9/12">
                    <input
                        type="text"
                        placeholder="Titolo"
                        className="bg-gray-300 w-full outline-none p-2 placeholder-black align-middle rounded-md"
                        maxLength={100}
                        value={article.name}
                    />
                    <input
                        type="text"
                        placeholder="Descrizione"
                        className="mt-5 bg-gray-300 w-full outline-none p-2 placeholder-black h-40 rounded-md"
                        maxLength={250}
                        value={article.description}
                    />
                    <div className="flex mt-5 text-center items-center">
                        <input
                            type="text"
                            readOnly={!isNewArticle}
                            placeholder="Barcode"
                            className="basis-4/12 bg-gray-300 w-full outline-none p-2 placeholder-black rounded-md"
                            value={article.barcode}
                        />
                        <div className="basis-4/12">
                            <label htmlFor="isActiveCheckbox" className="pr-2">
                                Attivo
                            </label>
                            <input
                                id="isActiveCheckbox"
                                type="checkbox"
                                checked={article.is_active}
                            />
                        </div>
                        <div className="basis-4/12">
                            <label htmlFor="reorderThreshold" className="pr-2">
                                Soglia riordino
                            </label>
                            <input
                                id="reorderThreshold"
                                type="number"
                                className="border-2 border-solid rounded-md text-right"
                                min="0"
                                value={article.reorder_threshold}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
