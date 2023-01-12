import { useEffect, useState } from 'react';
import { it } from '../locales/it';
import { en } from '../locales/en';

export default function useTranslation() {
    const [locale, setLocale] = useState<any>(en);
    const [languageCode, setLanguageCode] = useState('en-US');

    useEffect(() => {
        setLanguageCode(navigator.language);
        setLocale(navigator.language.slice(0, 2) === 'it' ? it : en);
    }, []);

    return { t: locale, language: languageCode };
}
