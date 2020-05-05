import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import locale from './locale'
import { LANGUAGES } from './constants'

const resources = {
  en: {
    translation: locale.en
  }
}

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['navigator']
    },
    interpolation: {
      escapeValue: false
    },
    keySeparator: '.' // we use content as keys
  })

for (const lng of LANGUAGES) {
  i18n.addResourceBundle(lng.code, 'translation', locale[lng.code])
}

export default i18n
