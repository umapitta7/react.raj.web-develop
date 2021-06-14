import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { CookieHandler } from '../utils/CookieHandler';
import { Utils } from '../utils';

const { en } = require('./en-US');
const { fr } = require('./fr-CA');
const { enca } = require('./en-CA');

const resources = {
  'en-US': {
    translation: en,
  },
  'fr-CA': {
    translation: fr,
  },
  'en-CA': {
    translation: enca,
  },
};

if (Utils.isDEV()) { // Only for react development
  const isCookieExists = CookieHandler.cookieExists('selectedLanguage');
  if (!isCookieExists) {
    CookieHandler.set('selectedLanguage', '-1');
  }
}

// const options = {
//   // It works based on browser language preference and query as well.
//   order: ['querystring', 'navigator'],
//   lookupQuerystring: 'lng',
//   // caches: ['localStorage'],
// };

const selectedLanguage = CookieHandler.get('selectedLanguage');

const lang = {
  '-1': 'en-US',
  '-25': 'fr-CA',
  '-24': 'en-CA'
};

let langToSet = lang[selectedLanguage];
langToSet = !Utils.isEmpty(langToSet) ? langToSet : 'en-US';

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    //  detection: options,
    lng: langToSet,
    fallbackLng: 'en-US',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
