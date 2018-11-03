import React from 'react';
import { createStackNavigator } from 'react-navigation';
import NavigationScreen from './screens/NavigationScreen';
import HomeScreen from './screens/HomeScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import FavesScreen from './screens/FavesScreen';
import MessagesScreen from './screens/MessagesScreen';
import SettingsScreen from './screens/SettingsScreen';

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
    return <RootStack />;
  }
}