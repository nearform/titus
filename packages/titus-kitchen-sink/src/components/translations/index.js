import * as React from 'react'
import {translate} from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import {withStyles} from '@material-ui/core/styles'

import './i18n.js'

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  paper: {
    marginTop: theme.spacing.unit,
    padding: theme.spacing.unit
  }
})

const LanguageButton = translate()(withStyles(styles)(function LanguageButton({classes, language, i18n}) {
  return (
    <Button
      color={language === i18n.language ? 'primary' : 'secondary'}
      className={classes.button}
      variant="contained"
      onClick={() => i18n.changeLanguage(language)}>
      {language}
    </Button>
  )
}))

function Translations({classes, t, i18n}) {
  return (
    <div>
      <Typography variant="h3" gutterBottom>Translation</Typography>
      <Typography paragraph>
        The text below will be translated when switching locales using the buttons
      </Typography>
      <LanguageButton language="en"/>
      <LanguageButton language="fr"/>
      <LanguageButton language="it"/>
      <Paper className={classes.paper}>
        <Typography variant="title" gutterBottom>{t('welcome')}</Typography>
        <Typography variant="subheading" gutterBottom>{t('description')}</Typography>
      </Paper>
    </div>
  )
}

export default translate()(withStyles(styles)(Translations))
