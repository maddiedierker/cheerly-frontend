import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import colors from '../assets/colors';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 90,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  horizontalRule: {
    width: 28,
    height: 1,
    borderWidth: 0.5,
    borderColor: colors.black,
  },
  header: {
    fontSize: 18,
    color: colors.black,
    marginHorizontal: 10,
  },
  input: {
    fontSize: 18,
    width: '75%',
    height: 65,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.warmGrey,
    backgroundColor: colors.whiteFour,
    color: colors.black,
  },
  button: {
    width: '75%',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.black,
    backgroundColor: colors.aquamarine,
    color: colors.black,
  },
  text: {
    fontSize: 18,
  },
});

export default class SignInScreen extends React.Component {
  state = {
    email: '',
    password: '',
  }

  submit = (event) => {

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.horizontalRule}></View>
          <Text style={styles.header}>Log in with email</Text>
          <View style={styles.horizontalRule}></View>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          placeholder='Email'
        />
        <TextInput
          style={styles.input}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          placeholder='Password (8+ characters)'
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.submit}
        >
          <Text style={styles.text}>Let's do this</Text>
        </TouchableOpacity>
      </View>
    );
  }
}