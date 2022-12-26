import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../components/useAuth';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Layout from '../components/layout/layout';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    const path = router.asPath;

    const [isLoginOrSignup, setIsLoginOrSignup] = useState(false);

    useEffect(() => {
        if (path.indexOf('/login') > -1 || path.indexOf('/signup') > -1) {
            setIsLoginOrSignup(true);
        } else {
            setIsLoginOrSignup(false);
        }
    }, [path]);
    return (
        <AuthProvider>
            {!isLoginOrSignup && (
                <Layout>
                    <Component {...pageProps} />
                    <Toaster position="top-right" />
                </Layout>
            )}
            {isLoginOrSignup && <Component {...pageProps} />}
        </AuthProvider>
    );
}
