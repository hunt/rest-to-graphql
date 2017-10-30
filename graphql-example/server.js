const fs = require('fs')
const express = require('express')
const { makeExecutableSchema } = require('graphql-tools')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

const resolvers = require('./resolvers')
const typeDefs = fs.readFileSync('./schema.gql', 'utf8')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const app = express()
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ 
  endpointURL: '/graphql',
}))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`listen http://localhost:${PORT}`)
})
