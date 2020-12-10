import * as yup from 'yup'
import { AUTH_PROVIDERS } from 'lib/constants'
import i18n from 'lib/i18n'

let password
if (process.env.REACT_APP_AUTH_PROVIDER === AUTH_PROVIDERS.MEM) {
  password = yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/i,
      i18n.t('validation.regex.password')
    )
    .required(i18n.t('validation.required.password'))
} else {
  password = yup.string().required(i18n.t('validation.required.password'))
}

export const loginFormSchema = yup.object().shape({
  username: yup.string().required(i18n.t('validation.required.username')),
  password
})
