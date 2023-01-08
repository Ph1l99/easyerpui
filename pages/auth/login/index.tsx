import Link from 'next/link';
import React, { FormEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import InputField from '../../../components/layout/inputField';
import { useAuth } from '../../../components/useAuth';
import Head from 'next/head';
import toast from 'react-hot-toast';
import useTranslation from '../../../components/useTranslation';
import { toastOnErrorApiResponse } from '../../../utils/toast';

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const { t } = useTranslation();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const submitLogin = async (e: FormEvent) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        login(email, password)
            .then(() => {
                router.push('/');
            })
            .catch(error => {
                toastOnErrorApiResponse(error, t.auth.login.api.loginError);
            });
    };

    useEffect(() => {
        emailRef.current?.focus();
    });

    return (
        <>
            <Head>
                <title>{t.auth.login.pageTitle}</title>
            </Head>
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <h1 className="text-upper text-sky-900 font-bold text-3xl">
                    EASY ERP
                </h1>
                <form
                    className="flex flex-col bg-sky-900 px-8 py-12 items-center rounded-lg gap-3 w-1/5 shadow-xl"
                    onSubmit={submitLogin}
                >
                    <InputField
                        type="email"
                        placeholder={t.auth.login.email}
                        ref={emailRef}
                    />
                    <InputField
                        type="password"
                        placeholder={t.auth.login.password}
                        ref={passwordRef}
                    />
                    <input
                        type="submit"
                        className="border text-center rounded px-5 py-1 bg-zinc-200 font-semibold outline-none focus:outline focus:outline-offset-4 focus:outline-white"
                        value={t.auth.login.login}
                    />
                    <Link href="/auth/signup" className="mt-2 text-white">
                        {t.auth.login.signupMessage}{' '}
                        <u>{t.auth.login.signup}</u>
                    </Link>
                </form>
            </div>
        </>
    );
}
