const fastifyPlugin = require('fastify-plugin')
const httpErrors = require('http-errors')

const resources = {
  en: {
    translations: {
      welcome: 'Welcome to titus and react-i18next',
      description: 'This is a sample localized resource stored on the server'
    }
  },
  fr: {
    translations: {
      welcome: 'Bienvenue sur titus et react-i18next',
      description:
        'Ceci est un exemple de ressource localisée stockée sur le serveur'
    }
  },
  it: {
    translations: {
      welcome: 'Benvenuto su titus e react-i18next',
      description:
        'Questo è un esempio di risorsa localizzata memorizzata lato server'
    }
  }
}

function plugin (server, opts, next) {
  server.route({
    path: '/locales/:language/:namespace',
    method: 'GET',
    schema: {
      tags: ['i18n'],
      params: {
        type: 'object',
        properties: {
          language: { type: 'string' },
          namespace: { type: 'string' }
        }
      }
    },
    handler: async (request, reply) => {
      const { language, namespace } = request.params

      if (!resources[language] || !resources[language][namespace]) {
        return new httpErrors.NotFound()
      }

      return resources[language][namespace]
    }
  })

  next()
}

module.exports = fastifyPlugin(plugin, {
  fastify: '1.x',
  name: 'i18n-routes'
})
