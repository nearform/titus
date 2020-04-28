import React, { Fragment } from 'react'
import Logo from '../logo'

const Dashboard = ({ logout }) => {
  return (
    <Fragment>
      <button className="logout button" onClick={logout}>
        LOGOUT
      </button>
      <Logo />
      <p>
        Develop and Deploy to features quickly using Titus, an Accelerated
        Development & Deployment Stack. Titus is production ready and can be
        deployed to all major cloud providers.
      </p>
      <a
        href="https://nf-titus.netlify.com/"
        rel="noopener noreferrer"
        target="_blank"
      >
        Check out the docs
      </a>
    </Fragment>
  )
}
// {adIdToken && (
//   <button onClick={testAzureAuth}>Test Azure Authentication</button>
// )}

export default Dashboard
