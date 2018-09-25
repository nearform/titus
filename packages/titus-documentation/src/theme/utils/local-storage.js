const checkWindow = () => {
  if (!window || typeof window === 'undefined') return
}

export const localStorage = () => ({
  get: key => {
    checkWindow()
    return window.localStorage.getItem(key)
  },
  set: (key, val) => {
    checkWindow()
    window.localStorage.setItem(key, val)
  },
  remove: key => {
    checkWindow()
    window.localStorage.removeItem(key)
  }
})
