import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import config from '../../config'
import Logo from '../logo'
import UserInfo from '../user-info'
import UserList from '../user-list'
import { LANGUAGES } from '../../constants'

const Dashboard = ({ logout }) => {
  const { t, i18n } = useTranslation()

  const onLanguageChange = e => {
    i18n.changeLanguage(e.target.value)
  }

  const language = i18n.language

  return (
    <>
      <div className="navbar">
        <select // eslint-disable-line jsx-a11y/no-onchange
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
        {config.enableAdmin && (
          <Link to="/admin">
            <button component="button" className="admin button">
              {t('admin')}
            </button>
          </Link>
        )}
        <button className="logout button" onClick={logout}>
          {t('logout')}
        </button>
      </div>
      <div className="container">
        <Logo />
        <p>{t('description')}</p>
        <a
          href="https://nf-titus.netlify.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t('docs')}
        </a>
        {config.aws.identityPoolId && <UserInfo />}
        {config.aws.identityPoolId && <UserList />}
      </div>
    </>
  )
}
// {adIdToken && (
//   <button onClick={testAzureAuth}>Test Azure Authentication</button>
// )}

export default Dashboard
