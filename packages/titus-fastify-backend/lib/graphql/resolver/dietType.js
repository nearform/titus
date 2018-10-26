'use strict'

const resolvers = {
  Query: {
    async allDietTypes(root, args, context) {
      return context.reply.request.dbClient.dietType.getAll()
    }
  },
  Mutation: {
    async deleteDietType(root, args, context) {
      return context.reply.request.dbClient.dietType.deleteDietType(args)
    },
    async toggleDietTypeVisibility(root, args, context) {
      return context.reply.request.dbClient.dietType.toggleDietTypeVisibility(
        args
      )
    }
  }
}

module.exports = resolvers
