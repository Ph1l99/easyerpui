import Link from 'next/link';
import React, { FormEvent, useEffect, useRef } from 'react';
import { saveToLocalStorage } from '../../utils/localStorage';
import {
    ACCESS_TOKEN_LOCAL_STORAGE_KEY,
    EASY_ERP_BASE_URL,
    REFRESH_TOKEN_LOCAL_STORAGE_KEY,
} from '../../utils/constants';
import { useRouter } from 'next/router';
import InputField from '../../components/inputField';

export default function Login() {
    const router = useRouter();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const submitLogin = (e: FormEvent) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (email !== '' && password !== '') {
            fetch(`${EASY_ERP_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password }),
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Invalid credentials');
                    }
                })
                .then(data => {
                    saveToLocalStorage(
                        ACCESS_TOKEN_LOCAL_STORAGE_KEY,
                        data.access
                    );
                    saveToLocalStorage(
                        REFRESH_TOKEN_LOCAL_STORAGE_KEY,
                        data.refresh
                    );

                    router.push('/home');
                })
                .catch(error => {
                    // TODO: should we log errors? We could then gain better understanding if something is not working properly
                    console.error(error);
                });
        }
    };

    useEffect(() => {
        emailRef.current?.focus();
    });

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-upper text-sky-900 font-bold text-3xl">
                EASY ERP
            </h1>
            <form
                className="flex flex-col bg-sky-900 px-8 py-12 items-center rounded-lg gap-3 w-1/5"
                onSubmit={submitLogin}
            >
                <InputField type="email" placeholder="Email" ref={emailRef} />
                <InputField
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                />
                <input
                    type="submit"
                    className="border text-center rounded px-5 py-1 bg-zinc-200 font-bold outline-none focus:outline focus:outline-offset-4 focus:outline-white"
                    value="Login"
                />
                <Link href="/" className="mt-2 text-white">
                    Non hai un account? <u>Registrati!</u>
                </Link>
            </form>
        </div>
    );
}
