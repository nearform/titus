import * as React from 'react'
import {translate} from 'react-i18next'
import {Typography, Button, Paper, withStyles, Grid} from '@material-ui/core'

import './i18n.js'

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  paper: {
    marginTop: theme.spacing.unit,
    padding: theme.spacing.unit,
  },
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
    <Grid container spacing={24}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant="h3" gutterBottom>Translation</Typography>
        <Typography paragraph>
          The text below will be translated when switching locales using the buttons
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <LanguageButton language="en"/>
        <LanguageButton language="fr"/>
        <LanguageButton language="it"/>
        <Paper className={classes.paper}>
          <Typography variant="title" gutterBottom>{t('welcome')}</Typography>
          <Typography variant="subheading" gutterBottom>{t('description')}</Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default translate()(withStyles(styles)(Translations))
