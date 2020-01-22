export const log = async msg => {
  const { REACT_APP_API_PATH } = process.env

  if (REACT_APP_API_PATH) {
    fetch(`${REACT_APP_API_PATH}/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ msg })
    }).catch(err => console.log('Error on log', err))
  } else {
    console.log(msg)
  }
}
