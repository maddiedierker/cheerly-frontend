import React from 'react'
import { View, Text } from 'react-native'
import { commonStyles as styles } from '../assets/styles'

export default class ScheduleScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Affirmation schedule</Text>
        <Text style={styles.subtitle}>
          Here's today's affirmations! Swipe to delete or edit, or you can turn them off for the day.
        </Text>
      </View>
    );
  }
}