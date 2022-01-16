import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enLabels from './locales/en-US/translation.json'
import itLabels from './locales/it-IT/translation.json'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enLabels,
    },
    it: {
      translation: itLabels,
    },
  },
  //language to use if translations in user language are not available
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export default i18n
