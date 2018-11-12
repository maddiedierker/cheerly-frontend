import React from 'react'
import {
  AsyncStorage,
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text 
} from 'react-native'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import colors from '../assets/colors'

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

const CREATE_USER = gql`
  mutation CreateUser($firstName: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
    createUser(firstName: $firstName, email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
      token
      errors
    }
  }
`

export default class SignUpScreen extends React.Component {
  state = {
    firstName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
  }

  onChangeInput = (property, value) => {
    const newState = {...this.state}
    newState[property] = value
    this.setState({ state: newState })
  }

  onChangeFirstName = (value) => {
    this.setState({
      firstName: value,
      errors: [],
    })
  }

  onChangeEmail = (value) => {
    this.setState({
      email: value,
      errors: [],
    })
  }

  onChangePassword = (value) => {
    this.setState({
      password: value,
      errors: [],
    })
  }

  onChangePasswordConfirmation = (value) => {
    this.setState({
      passwordConfirmation: value,
      errors: [],
    })
  }

  submit = async (signUpMutation) => {
    const variables = {
      firstName: this.state.firstName,
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation,
    }
    const response = await signUpMutation({ variables })
    const { token, errors } = response.data.createUser

    if (errors.length > 0 || token.length === 0) {
      this.setState({ errors })
    } else {
      await AsyncStorage.setItem('token', token)
      this.props.navigation.navigate('Navigation')
    }
  }

  render() {
    return (
      <Mutation mutation={CREATE_USER}>
        {createUser =>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={styles.horizontalRule}></View>
              <Text style={styles.header}>Or sign up with email</Text>
              <View style={styles.horizontalRule}></View>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={this.onChangeFirstName}
              value={this.state.firstName}
              placeholder='First name'
            />
            <TextInput
              style={styles.input}
              onChangeText={this.onChangeEmail}
              value={this.state.email}
              placeholder='Email address'
            />
            <TextInput
              style={styles.input}
              onChangeText={this.onChangePassword}
              value={this.state.password}
              placeholder='Password (8+ characters)'
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              onChangeText={this.onChangePasswordConfirmation}
              value={this.state.passwordConfirmation}
              placeholder='Password confirmation'
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.submit(createUser)}
            >
              <Text style={styles.text}>Let's do this</Text>
            </TouchableOpacity>
            {this.state.errors.map((error, index) => <Text key={index}>{error}</Text>)}
          </View>
        }
      </Mutation>
    );
  }
}