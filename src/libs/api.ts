import { GraphQLClient } from 'graphql-request'
import { env } from '../env'

const client = new GraphQLClient(env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT)

export default client