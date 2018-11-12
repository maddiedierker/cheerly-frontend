import { AsyncStorage } from 'react-native'
import { ApolloClient} from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

// TODO: get GraphQL URI from env variable
const httpLink = new createHttpLink({ uri: 'http://localhost:3000/graphql' })
const cache = new InMemoryCache()
let cachedToken

export const setAuthToken = async (token) => {
  AsyncStorage.setItem('token', token)
}

const getAuthToken = () => {
  if (cachedToken) {
    return cachedToken
  } else {
    return AsyncStorage.getItem('token').then(token => {
      cachedToken = token
      return cachedToken
    })
  }
}

const authLink = setContext((_, { headers }) => {
  headers: {
    authorization: `Bearer ${getAuthToken()}`
  }
})

export const client = new ApolloClient({ 
  link: authLink.concat(httpLink), 
  cache 
})