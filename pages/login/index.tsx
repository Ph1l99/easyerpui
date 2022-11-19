import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
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
                    router.push('/home');
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
                <InputField
                    type="email"
                    placeholder="Email"
                    value={inputEmail}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setInputEmail(e.target.value)
                    }
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    value={inputPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setInputPassword(e.target.value)
                    }
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
