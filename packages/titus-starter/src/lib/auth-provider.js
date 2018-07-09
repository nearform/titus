export default {
  login: ({username, password}) => {
    // This is where you'd implement the user authentication logic

    // this example will just return a dummy user object
    return {
      username,
      dob: '01/01/1980, 00:00:00',
      avatar: 'https://source.unsplash.com/400x400/?avatar'
    }
  }
}
