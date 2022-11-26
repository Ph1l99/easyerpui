import InputField from '../../components/layout/inputField';
import React, { FormEvent, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function Signup() {
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const submitSignup = async (e: FormEvent) => {
        e.preventDefault();
        return;
    };

    useEffect(() => {
        firstNameRef.current?.focus();
    });

    return (
        <>
            <Head>
                <title>Signup</title>
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
                        placeholder="Nome"
                        ref={firstNameRef}
                    />
                    <InputField
                        type="text"
                        placeholder="Cognome"
                        ref={lastNameRef}
                    />
                    <InputField
                        type="text"
                        placeholder="Username"
                        ref={usernameRef}
                    />
                    <InputField
                        type="email"
                        placeholder="Email"
                        ref={emailRef}
                    />
                    <InputField
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                    />
                    <input
                        type="submit"
                        className="border text-center rounded px-5 py-1 bg-zinc-200 font-semibold outline-none focus:outline focus:outline-offset-4 focus:outline-white"
                        value="Registrami"
                    />
                </form>
            </div>
        </>
    );
}
