'use strict'
const fetch = require('node-fetch')
const dietType = require('../model/dietType')
const config = require('../../../config/default')

async function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function checkUserAccess (auth, user, action, resource) {
  return fetch(
    `${config.authorization.url}access/${user}/${action}/${resource}`,
    {
      headers: {
        authorization: auth
      }
    }
  )
    .then(checkStatus)
    .then(res => res.json())
    .then(({ access }) => access)
    .catch(error => console.log(error))
}

const resolvers = {
  Query: {
    async allDietTypes (root, args, context) {
      const authorized = await checkUserAccess(
        'ROOTid',
        context.user,
        'read',
        'dietaryTypes'
      )

      if (authorized) {
        return dietType.getAll(context.pg)
      }

      throw new Error('unauthorized')
    }
  },
  Mutation: {
    async deleteDietType (root, args, context) {
      const authorized = await checkUserAccess(
        'ROOTid',
        context.user,
        'delete',
        'dietaryTypes'
      )

      if (authorized) {
        return dietType.deleteDietType(context.pg, args)
      }

      throw new Error('unauthorized')
    },
    async toggleDietTypeVisibility (root, args, context) {
      const authorized = await checkUserAccess(
        'ROOTid',
        context.user,
        'visibility',
        'dietaryTypes'
      )

      if (authorized) {
        return dietType.toggleDietTypeVisibility(context.pg, args)
      }

      throw new Error('unauthorized')
    }
  }
}

module.exports = resolvers
