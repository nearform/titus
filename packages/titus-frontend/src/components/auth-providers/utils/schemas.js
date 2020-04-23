import * as yup from 'yup'

export const loginFormSchema = yup.object().shape({
  username: yup.string().required('Username is required.'),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/i,
      'Password must be at least 4 characters long and contain at least one letter and one number.'
    )
    .required('Password is required.')
})
