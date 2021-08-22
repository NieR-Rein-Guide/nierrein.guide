import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(process.env.GRAPHQL_API_ENDPOINT)

export default client