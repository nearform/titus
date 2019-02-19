// order matters here:
// logging first because other plugins may use it
// then authentication because it declares default strategy for incoming routes
module.exports = [require('hapi-pino'), require('./auth0'), require('./pg')]
