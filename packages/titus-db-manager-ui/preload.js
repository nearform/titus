const migrate = require('../titus-db-manager/migrate/')
const seed = require('../titus-db-manager/seed/')
const truncate = require('../titus-db-manager/truncate/')
const start = require('../titus-db-manager/start/')

const ACTION_MAP = {
  start,
  migrate,
  seed,
  truncate,
}

const fireAction = async (e) => {
  e.target.setAttribute('disabled', true)
  await ACTION_MAP[e.target.getAttribute('id')]()
  alert('Finished')
  e.target.removeAttribute('disabled')
}

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  const BTNS = [...document.querySelectorAll('button')]
  BTNS.forEach((BTN) => BTN.addEventListener('click', fireAction))

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
