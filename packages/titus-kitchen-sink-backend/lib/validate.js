const users = {
  john: {
    id: 1,
    username: 'john',
    name: 'John Smith'
  },
  jane: {
    id: 2,
    username: 'jane',
    name: 'John Doe'
  },
  titus: {
    id: 3,
    username: 'titus',
    name: 'Titus User'
  }
}

const passwords = {
  john: 'john',
  jane: 'jane',
  titus: 'titus'
}

const validate = async (request, username, password, h) => {
  if (username === 'help') {
    return { response: h.redirect('https://hapijs.com/help') } // custom response
  }

  const user = users[username]
  if (!user) {
    return { credentials: null, isValid: false }
  }

  const isValid = password === passwords[username]

  return { isValid, credentials: users[username] }
}

module.exports = validate
