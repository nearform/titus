import React, { Component } from 'react'
import { AuthConsumer } from '../../components/authentication/authentication-context'

import './dashboard.css'

class Dashboard extends Component {
  state = { books: false, loading: false }

  loadBooksREST = async () => {
    this.setState({ loading: true })
    const response = await fetch('/books')
    const books = await response.json()
    this.setState({ books, loading: false })
  }

  loadBooksGraphQL = async () => {
    this.setState({ loading: true })
    const response = await fetch('/graphql', {
      body: JSON.stringify({
        query: 'query { books { id author title published } }'
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    })
    const {
      data: { books }
    } = await response.json()
    this.setState({ books, loading: false })
  }

  render() {
    const { books, loading } = this.state
    let textContent = ''
    if (loading) {
      textContent = 'Loading...'
    } else if (books) {
      textContent = JSON.stringify(books, null, 2)
    }
    return (
      <AuthConsumer>
        {({ logout }) => (
          <div className="container dashboard">
            <button className="logout button" onClick={logout}>
              LOGOUT
            </button>
            <img alt="Titus logo" src="img/Accel_Logo_Titus.svg" />
            <p>
              Develop and Deploy to features quickly using Titus, an Accelerated
              Development & Deployment Stack. Titus is production ready and can
              be deployed to all major cloud providers.
            </p>
            <a
              href="https://nf-titus.netlify.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Check out the docs
            </a>
            <div className="books">
              <h2>AJAX Example</h2>
              <textarea disabled value={textContent} />
              <button onClick={this.loadBooksREST}>Load Books via REST</button>
              <button onClick={this.loadBooksGraphQL}>
                Load Books via GraphQL
              </button>
            </div>
          </div>
        )}
      </AuthConsumer>
    )
  }
}

export default Dashboard
