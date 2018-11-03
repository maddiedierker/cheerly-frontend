import React from 'react';
import { View, Text, Button } from 'react-native';

export default class NavigationScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title='Home'
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title='Schedule'
          onPress={() => this.props.navigation.navigate('Schedule')}
        />
        <Button
          title='Faves'
          onPress={() => this.props.navigation.navigate('Faves')}
        />
        <Button
          title='Messages'
          onPress={() => this.props.navigation.navigate('Messages')}
        />
        <Button
          title='Settings'
          onPress={() => this.props.navigation.navigate('Settings')}
        />
      </View>
    );
  }
}