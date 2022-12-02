import { useRouter } from 'next/router';
import { useState } from 'react';
import useApi from '../../../components/useApi';

export default function Article() {
    const router = useRouter();
    const api = useApi();

    const [article, setArticle] = useState();

    const loadArticleData = () => {
        api.authAxios.get(router.asPath).then(response => {
            setArticle(response.data);
        });
    };

    return (
        <>
            <div>Article: {router.asPath}</div>
        </>
    );
}
