import * as yup from 'yup'
import i18n from 'src/i18n'

export const loginFormSchema = yup.object().shape({
  username: yup.string().required(i18n.t('validation.required.username')),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/i,
      i18n.t('validation.regex.password')
    )
    .required(i18n.t('validation.required.password'))
})
