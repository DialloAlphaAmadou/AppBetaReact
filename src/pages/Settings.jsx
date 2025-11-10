import React from 'react';
import {ThemeToggle} from '../components/ThemeToggle';
import LanguageSelector from '../components/languages';
import { useTranslation } from 'react-i18next';

function Settings() {
    const {t} = useTranslation();
    return (
        <div className="col-sm-8 col-md-6 col-lg-4 mx-auto p-2 rounded shadow">
            <h1 className="text-center mb-4">{t("settings")} </h1>
            <div className='mb-2'><LanguageSelector /></div>
            <div className=''><ThemeToggle /></div>
        </div>
    )
}

export default Settings;