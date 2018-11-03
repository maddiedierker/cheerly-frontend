import React from 'react';
import { ApolloClient} from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
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

const cache = new InMemoryCache()
const stateLink = withClientState({
  cache,
  defaults: {
    testing: {
      __typename: 'testing',
      name: '',
      age: 0
    }
  }
})
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    new HttpLink({ uri: 'http://localhost:3000/graphql' })
  ])
})

// make client to rewrite the defaults every time the store resets
client.onResetStore(stateLink.writeDefaults)

const RootStack = createStackNavigator(
  {
    Navigation: NavigationScreen,
    Home: HomeScreen,
    Schedule: ScheduleScreen,
    Faves: FavesScreen,
    Messages: MessagesScreen,
    Settings: SettingsScreen,
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