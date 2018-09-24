'use strict'

const TrailManager = require('@nearform/trail-core').TrailsManager

const trailManager = new TrailManager()

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
      description: 'Ceci est un exemple de ressource localisée stockée sur le serveur'
    }
  },
  it: {
    translations: {
      welcome: 'Benvenuto su titus e react-i18next',
      description: 'Questo è un esempio di risorsa localizzata memorizzata lato server'
    }
  }
}

const translations = () => ({
  method: 'GET',
  path: '/locales/{language}/{namespace}.json',
  config: {
    auth: false,
    tags: ['api']
  },
  handler: async (request, h) => {
    const { language, namespace } = request.params

    await trailManager.insert({
      when: new Date(),
      who: request.info.remoteAddress,
      what: 'get',
      subject: 'locales'
    })

    try {
      return resources[language][namespace]
    } catch (err) {
      const response = h.response()
      response.statusCode = 404
      return response
    }
  }
})

module.exports = (server, config) => [
  translations(server, config)
]
