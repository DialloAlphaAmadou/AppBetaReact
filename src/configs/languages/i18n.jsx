import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import fr from './fr';
import en from './en';

i18n
  .use(LanguageDetector) // détecte automatiquement la langue du navigateur
  .use(initReactI18next) // connecte i18n à React
  .init({
    resources: {
      en: {
        translation: en
      },
      fr: {
        translation: fr
      },
    },
    fallbackLng: "en", // langue par défaut
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
