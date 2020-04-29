import React from 'react'
import { useTranslation } from 'react-i18next'
import Logo from '../logo'

const Dashboard = ({ logout }) => {
  const { t } = useTranslation()

  return (
    <>
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
    </>
  )
}
// {adIdToken && (
//   <button onClick={testAzureAuth}>Test Azure Authentication</button>
// )}

export default Dashboard
