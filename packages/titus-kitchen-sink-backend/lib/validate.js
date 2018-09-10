const users = {
  john: {
    id: 1,
    username: 'john',
    name: 'John Doe'
  }
}

const passwords = {
  john: 'john'
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
