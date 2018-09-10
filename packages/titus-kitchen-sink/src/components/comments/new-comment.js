import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import {
  Typography,
  TextField,
  FormControl,
  Button,
  withStyles
} from '@material-ui/core'
const styles = theme => ({
  resetButton: {
    margin: '1em 0'
  }
})
const schema = yup.object().shape({
  comment: yup.string().required('A comment cannot be empty.')
})

const NewComment = props => {
  const { title, classes, onSubmit } = props

  return (
    <Formik
      initialValues={{
        comment: ''
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
        const { comment } = values

        new Promise(resolve => {
          setSubmitting(true)
          resolve()
        })
          .then(() => onSubmit(comment))
          .then(resetForm)
          .then(() => setSubmitting(false))
      }}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isValid,
        isSubmitting
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              {title && <h2>{title}</h2>}
              <TextField
                name="comment"
                value={values.comment}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Enter a comment"
                multiline
                rows="2"
                rowsMax="4"
                margin="normal"
                error={Boolean(touched.comment && errors.comment)}
              />

              {touched.comment &&
                errors.comment && (
                  <Typography color="error" variant="subheading" gutterBottom>
                    {errors.comment}
                  </Typography>
                )}
            </FormControl>
            <FormControl fullWidth>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Add Comment
              </Button>

              <Button
                type="reset"
                onClick={handleReset}
                className={classes.resetButton}
                disabled={isSubmitting || !isValid}
              >
                Reset Comment
              </Button>
            </FormControl>
          </form>
        )
      }}
    />
  )
}

export default withStyles(styles)(NewComment)
