import { API_PATH } from './config'

export const log = async msg => {
  if (API_PATH) {
    fetch(`${API_PATH}/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ msg })
    }).catch(err => console.log('Error on log', err))
  } else {
    console.log(msg)
  }
}
