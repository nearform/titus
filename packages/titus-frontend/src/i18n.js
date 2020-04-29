import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      logout: 'LOGOUT',
      login: 'Login',
      withAuth0: 'with Auth0',
      description: `Develop and Deploy to features quickly using Titus, an Accelerated
        Development & Deployment Stack. Titus is production ready and can be
        deployed to all major cloud providers.`,
      docs: 'Check out the docs',
      username: 'Username',
      password: 'Password',
      newPassword: 'New Password',
      header: {
        memory:
          'Note: Any username followed by a password with at least four characters containing at least one letter or number will work.',
        aws: 'Please provide AWS Cognito account details:',
        azure: 'Powered by Azure AD',
        titus: 'Please provide Auth0 account details:'
      },
      validation: {
        required: {
          username: 'Username is required.',
          password: 'Password is required.'
        },
        regex: {
          password:
            'Password must be at least 4 characters long and contain at least one letter and one number.'
        }
      },
      errors: {
        tempPassword: 'Please enter your temporary password and a new password'
      }
    }
  },
  ro: {
    translation: {
      username: 'Nume utilizator',
      password: 'Parola',
      header: {
        memory: `Nota: Orice nume de utilizator urmat de o parola de cel putin patru caractere continand cel putin o litera sau un numar va functiona.`
      }
    }
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

export default i18n
