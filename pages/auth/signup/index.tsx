import InputField from '../../../components/layout/inputField';
import React, { FormEvent, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useAuth } from '../../../components/useAuth';
import { EASY_ERP_LOGIN_URL } from '../../../utils/urls';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import useTranslation from '../../../components/useTranslation';

export default function Signup() {
    const router = useRouter();
    const { signup } = useAuth();
    const { t } = useTranslation();

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const submitSignup = async (e: FormEvent) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const username = usernameRef.current?.value;

        signup({
            email: email,
            password: password,
            profile: {
                first_name: firstName,
                last_name: lastName,
                username: username,
            },
        })
            .then(() => {
                router.push(EASY_ERP_LOGIN_URL);
            })
            .catch(() => {
                toast.error('Error while registering to EasyErp');
            });
    };

    useEffect(() => {
        firstNameRef.current?.focus();
    });

    return (
        <>
            <Head>
                <title>{t.auth.signup.pageTitle}</title>
            </Head>
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <h1 className="text-upper text-sky-900 font-bold text-3xl">
                    EASY ERP
                </h1>
                <form
                    className="flex flex-col bg-sky-900 px-8 py-12 items-center rounded-lg gap-3 w-1/5 shadow-xl"
                    onSubmit={submitSignup}
                >
                    <InputField
                        type="text"
                        placeholder={t.auth.signup.firstName}
                        ref={firstNameRef}
                    />
                    <InputField
                        type="text"
                        placeholder={t.auth.signup.lastName}
                        ref={lastNameRef}
                    />
                    <InputField
                        type="text"
                        placeholder={t.auth.signup.username}
                        ref={usernameRef}
                    />
                    <InputField
                        type="email"
                        placeholder={t.auth.signup.email}
                        ref={emailRef}
                    />
                    <InputField
                        type="password"
                        placeholder={t.auth.signup.password}
                        ref={passwordRef}
                    />
                    <input
                        type="submit"
                        className="border text-center rounded px-5 py-1 bg-zinc-200 font-semibold outline-none focus:outline focus:outline-offset-4 focus:outline-white"
                        value={t.auth.signup.signup}
                    />
                </form>
            </div>
        </>
    );
}
