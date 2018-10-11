'use strict'

const {
  makeExecutableSchema,
  addMockFunctionsToSchema
} = require('graphql-tools')
const { graphql } = require('graphql')
const typeDefs = require('../../lib/graphql/schema')
const resolvers = require('../../lib/graphql/resolver/scalars')

const mockId = 'id'
const mockString = 'string'
const mockInt = 1
const mockFloat = 1.2
const mockDate = new Date()
const mockBoolean = true

const mocks = {
  ID: () => mockId,
  String: () => mockString,
  Int: () => mockInt,
  Float: () => mockFloat,
  Date: () => mockDate,
  Range: () => ({ begin: mockDate, end: mockDate }),
  Boolean: () => mockBoolean
}

const schema = makeExecutableSchema({ typeDefs, resolvers })
addMockFunctionsToSchema({ schema, mocks })

describe('queries', () => {
  test('food', async () => {
    const query = `
    query {
      food {
        id
        name
        foodGroup {
          id
          name
        }
      }
    }
    `

    const {
      data: { food }
    } = await graphql(schema, query)

    expect(food).toEqual({
      id: mockId,
      name: mockString,
      foodGroup: {
        id: mockId,
        name: mockString
      }
    })
  })

  test('foodHistory', async () => {
    const query = `
    query loadFoodHistory($id: ID!) {
      foodHistory(id: $id) {
        id
        name
        sysPeriod {
          begin
          end
        }
        foodGroup {
          id
          name
        }
      }
    }
    `

    const {
      data: { foodHistory }
    } = await graphql(schema, query, null, null, { id: mockId })

    expect(foodHistory).toContainEqual({
      id: mockId,
      name: mockString,
      sysPeriod: {
        begin: mockDate,
        end: mockDate
      },
      foodGroup: {
        id: mockId,
        name: mockString
      }
    })
  })

  test('search', async () => {
    const query = `
    query {
      search {
        id
        name
      }
    }
    `

    const {
      data: { search }
    } = await graphql(schema, query)

    expect(search).toContainEqual({
      id: mockId,
      name: mockString
    })
  })

  test('keywordSearch', async () => {
    const query = `
    query {
      keywordSearch {
        word
        score
      }
    }
    `

    const {
      data: { keywordSearch }
    } = await graphql(schema, query)

    expect(keywordSearch).toContainEqual({
      word: mockString,
      score: mockFloat
    })
  })

  test('allFood', async () => {
    const query = `
    query {
      allFood {
        id
        name
        foodGroup {
          id
          name
        }
      }
    }
    `

    const {
      data: { allFood }
    } = await graphql(schema, query)

    expect(allFood).toContainEqual({
      id: mockId,
      name: mockString,
      foodGroup: {
        id: mockId,
        name: mockString
      }
    })
  })

  test('foodGroup', async () => {
    const query = `
    query {
      foodGroup {
        id
        name
      }
    }
    `

    const {
      data: { foodGroup }
    } = await graphql(schema, query)

    expect(foodGroup).toEqual({
      id: mockId,
      name: mockString
    })
  })

  test('allFoodGroups', async () => {
    const query = `
    query {
      allFoodGroups {
        id
        name
      }
    }
    `

    const {
      data: { allFoodGroups }
    } = await graphql(schema, query)

    expect(allFoodGroups).toContainEqual({
      id: mockId,
      name: mockString
    })
  })

  test('allDietTypes', async () => {
    const query = `
    query {
      allDietTypes {
        id
        name
        visible
      }
    }
    `

    const {
      data: { allDietTypes }
    } = await graphql(schema, query)

    expect(allDietTypes).toContainEqual({
      id: mockId,
      name: mockString,
      visible: mockBoolean
    })
  })
})

describe('mutations', () => {
  test('createFood', async () => {
    const mutation = `
    mutation {
      createFood {
        typeName
        id
        operation
        count
        updated {
          id
          name
        }
      }
    }
    `

    const {
      data: { createFood }
    } = await graphql(schema, mutation)

    expect(createFood).toEqual({
      typeName: mockString,
      id: mockId,
      operation: mockString,
      count: mockInt,
      updated: {
        id: mockId,
        name: mockString
      }
    })
  })

  test('updateFood', async () => {
    const mutation = `
    mutation {
      updateFood {
        typeName
        id
        operation
        count
        updated {
          id
          name
        }
      }
    }
    `

    const {
      data: { updateFood }
    } = await graphql(schema, mutation)

    expect(updateFood).toEqual({
      typeName: mockString,
      id: mockId,
      operation: mockString,
      count: mockInt,
      updated: {
        id: mockId,
        name: mockString
      }
    })
  })

  test('deleteFoods', async () => {
    const mutation = `
    mutation {
      deleteFoods(ids: ["${mockId}"]) {
        typeName
        ids
        operation
        count
      }
    }
    `

    const {
      data: { deleteFoods }
    } = await graphql(schema, mutation)

    expect(deleteFoods).toEqual({
      typeName: mockString,
      ids: [mockId, mockId],
      operation: mockString,
      count: mockInt
    })
  })

  test('createFoodGroup', async () => {
    const mutation = `
    mutation {
      createFoodGroup {
        id
        name
      }
    }
    `

    const {
      data: { createFoodGroup }
    } = await graphql(schema, mutation)

    expect(createFoodGroup).toEqual({
      id: mockId,
      name: mockString
    })
  })

  test('deleteDietType', async () => {
    const mutation = `
    mutation {
      deleteDietType {
        typeName
        id
        name
        operation
      }
    }
    `

    const {
      data: { deleteDietType }
    } = await graphql(schema, mutation)

    expect(deleteDietType).toEqual({
      typeName: mockString,
      id: mockId,
      name: mockString,
      operation: mockString
    })
  })

  test('toggleDietTypeVisibility', async () => {
    const mutation = `
    mutation {
      toggleDietTypeVisibility {
        typeName
        id
        name
        operation
      }
    }
    `

    const {
      data: { toggleDietTypeVisibility }
    } = await graphql(schema, mutation)

    expect(toggleDietTypeVisibility).toEqual({
      typeName: mockString,
      id: mockId,
      name: mockString,
      operation: mockString
    })
  })
})
