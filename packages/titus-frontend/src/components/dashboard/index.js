import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import Logo from '../logo'
import { LANGUAGES } from '../../constants'

const Dashboard = ({ logout }) => {
  const { t, i18n } = useTranslation()

  const onLanguageChange = e => {
    i18n.changeLanguage(e.target.value)
  }

  const language = i18n.language

  return (
    <Fragment>
      <select
        id="language"
        aria-label={`${t('language')}:`}
        className="language-selector"
        onChange={onLanguageChange}
      >
        {LANGUAGES.map(lng => (
          <option
            key={lng.code}
            value={lng.code}
            defaultValue={lng.code === language ? 'selected' : null}
          >
            {lng.name} {lng.flag}
          </option>
        ))}
      </select>
      <button className="logout button" onClick={logout}>
        {t('logout')}
      </button>
      <Logo />
      <p>{t('description')}</p>
      <a
        href="https://nf-titus.netlify.com/"
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('docs')}
      </a>
    </Fragment>
  )
}
// {adIdToken && (
//   <button onClick={testAzureAuth}>Test Azure Authentication</button>
// )}

export default Dashboard
