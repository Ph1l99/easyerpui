import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../components/useAuth';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Layout from '../components/layout/layout';

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>
    );
}
