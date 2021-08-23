import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT)

export default client