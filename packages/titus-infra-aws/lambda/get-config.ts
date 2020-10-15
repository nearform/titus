module.exports = {
  handler: async () => {
    const prefix = 'APP_CONFIG_'
    const returnValues = Object.entries(process.env)
      .filter(entry => entry[0].startsWith(prefix))
      .reduce((acc: Record<string, string | undefined>, next) => {
        acc[next[0].substr(prefix.length)] = next[1]
        return acc
      }, {})
    1
    return {
      statusCode: 200,
      body: JSON.stringify(returnValues),
      headers: {
        'Access-Control-Allow-Origin': process.env.CORS_ORIGIN,
        'Access-Control-Allow-Credentials': process.env.CORS_CREDENTIALS === 'true'
      }
    }
  }
}
