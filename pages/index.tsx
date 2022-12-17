import Head from 'next/head';
import { useAuth } from '../components/useAuth';
import { useEffect } from 'react';

export default function Home() {
    const { user, getProfileInfo } = useAuth();

    useEffect(() => {
        getProfileInfo();
    }, []);

    return (
        <>
            <Head>
                <title>Easy ERP</title>
                <meta name="description" content="Easy ERP" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>Benvenuto, {user?.firstName}</main>
        </>
    );
}
