import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import xhr from 'i18next-xhr-backend'
import { reactI18nextModule } from 'react-i18next'

i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .use(xhr)
  .init({
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    debug: true,
    react: {
      wait: true
    }
  })

export default i18n
