
export default {
  login: ({username, password}) => {
    // This is where you'd implement the user authentication logic, it must return a Promise.

    // This example will just return a dummy user object, showing a random avatar image
    return new Promise((resolve, reject) => {
      resolve({
        username
      })
    })
  }
}
