import React from 'react';
import { AsyncStorage } from 'react-native';
import { ApolloClient} from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { withClientState } from 'apollo-link-state';
import { createStackNavigator } from 'react-navigation';
import NavigationScreen from './screens/NavigationScreen';
import HomeScreen from './screens/HomeScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import FavesScreen from './screens/FavesScreen';
import MessagesScreen from './screens/MessagesScreen';
import SettingsScreen from './screens/SettingsScreen';
import SignInScreen from './screens/SignInScreen';

const httpLink = new createHttpLink({ uri: 'http://localhost:3000/graphql' })
let cachedToken;
const authLink = setContext((_, { headers }) => {
  if (cachedToken) {
    return {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  }

  return AsyncStorage.getItem('token').then(token => {
    cachedToken = token
    return {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  })
});

const cache = new InMemoryCache()
const client = new ApolloClient({ 
  link: authLink.concat(httpLink), 
  cache 
})

const RootStack = createStackNavigator(
  {
    Navigation: NavigationScreen,
    Home: HomeScreen,
    Schedule: ScheduleScreen,
    Faves: FavesScreen,
    Messages: MessagesScreen,
    Settings: SettingsScreen,
    SignIn: SignInScreen,
  },
  {
    initialRouteName: 'Navigation',
  }
);

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <RootStack />
      </ApolloProvider>
    );
  }
}