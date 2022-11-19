import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { saveToLocalStorage } from '../../utils/localStorage';
import {
    ACCESS_TOKEN_LOCAL_STORAGE_KEY,
    EASY_ERP_BASE_URL,
    REFRESH_TOKEN_LOCAL_STORAGE_KEY,
} from '../../utils/constants';

export default function Login() {
    const [inputEmail, setInputEmail] = useState<string | undefined>();
    const [inputPassword, setInputPassword] = useState<string | undefined>();

    const submitLogin = (e: FormEvent) => {
        e.preventDefault();
        if (inputPassword !== undefined && inputEmail !== undefined) {
            fetch(`${EASY_ERP_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: inputEmail,
                    password: inputPassword,
                }),
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
                });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-upper text-sky-900 font-bold text-3xl">
                EASY ERP
            </h1>
            <form
                className="flex flex-col bg-sky-900 px-8 py-12 items-center rounded-lg gap-3 w-1/5"
                onSubmit={submitLogin}
            >
                <input
                    type="text"
                    className="p-2 bg-zinc-200 rounded-lg placeholder-zinc-700 w-full outline-none focus:outline focus:outline-offset-4 focus:outline-white"
                    placeholder="Email"
                    value={inputEmail}
                    onChange={e => setInputEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="p-2 bg-zinc-200 rounded-lg placeholder-zinc-700 w-full outline-none focus:outline focus:outline-offset-4 focus:outline-white"
                    placeholder="Password"
                    value={inputPassword}
                    onChange={e => setInputPassword(e.target.value)}
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
