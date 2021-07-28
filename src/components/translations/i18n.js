import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import de from './de.json';

i18n.use(initReactI18next).init(
  {
    lng: 'de',
    fallbackLng: 'en',
    keySeparator: false, // we do not use keys in form messages.welcome
    resources: {
      en: {
        translation: en,
      },
      de: {
        translation: de,
      },
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      transSupportBasicHtmlNodes: true,
    },
  },
  err => {
    if (err) return console.error('something went wrong loading', err);
  },
);

export default i18n;
