import React from 'react'
import { AuthConsumer } from '../authentication'

const Dashboard = () => (
  <AuthConsumer>
    {({ logout }) => (
      <div className="container">
        <button className="logout button" onClick={logout}>
          LOGOUT
        </button>
        <img
          alt="Titus logo"
          style={{ height: '50vh' }}
          src="img/logo-pos.svg"
        />
        <p>
          Develop and Deploy to features quickly using Titus, an Accelerated
          Development & Deployment Stack. Titus is production ready and can be
          deployed to all major cloud providers.
        </p>
        <a
          href="https://nearform.github.io/titus"
          rel="noopener noreferrer"
          target="_blank"
        >
          Check out the docs
        </a>
      </div>
    )}
  </AuthConsumer>
)

export default Dashboard
