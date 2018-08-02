'use strict'
const dietType = require('../model/dietType')
const fetch = require('node-fetch')

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function checkUserAccess (auth, user, action, resource) {
  return fetch(`http://localhost:5000/authorization/access/${user}/${action}/${resource}`, {
    headers: {
      authorization: auth
    }
  })
    .then(checkStatus)
    .then(res => res.json())
    .then(({access}) => access)
    .catch(error => console.log(error))
}

const resolvers = {
  Query: {
    async allDietTypes (root, args, context) {
      try {
        const authorized = await checkUserAccess('ROOTid', context.user, 'read', 'dietaryTypes')

        if (authorized) {
          return dietType.getAll(context.pg)
        }

        throw new Error('unauthorized')
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    async deleteDietType (root, args, context) {
      try {
        const authorized = await checkUserAccess('ROOTid', context.user, 'delete', 'dietaryTypes')

        if (authorized) {
          return dietType.deleteDietType(context.pg, args)
        }

        throw new Error('unauthorized')
      } catch (error) {
        throw error
      }
    },
    async toggleDietTypeVisibility (root, args, context) {
      try {
        const authorized = await checkUserAccess('ROOTid', context.user, 'visibility', 'dietaryTypes')

        if (authorized) {
          return dietType.toggleDietTypeVisibility(context.pg, args)
        }

        throw new Error('unauthorized')
      } catch (error) {
        throw error
      }
    }
  }
}

module.exports = resolvers
