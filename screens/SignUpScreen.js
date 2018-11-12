import React from 'react'
import {
  View, 
  TextInput, 
  TouchableOpacity, 
  Text 
} from 'react-native'
import { Mutation } from 'react-apollo'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import { setAuthToken } from '../apolloClient'
import { formStyles } from '../assets/styles'

const CREATE_USER = gql`
  mutation CreateUser($firstName: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
    createUser(firstName: $firstName, email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
      token
      user {
        firstName
        email
      }
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

  submit = async (signUpMutation, client) => {
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
      client.writeData({ data: { user } })
      await setAuthToken(token)
      this.props.navigation.navigate('Navigation')
    }
  }

  render() {
    return (
      <ApolloConsumer>
        {client =>
          <Mutation mutation={CREATE_USER}>
            {createUser =>
              <View style={formStyles.container}>
                <View style={formStyles.headerContainer}>
                  <View style={formStyles.horizontalRule}></View>
                  <Text style={formStyles.header}>Or sign up with email</Text>
                  <View style={formStyles.horizontalRule}></View>
                </View>
                <TextInput
                  style={formStyles.input}
                  onChangeText={this.onChangeFirstName}
                  value={this.state.firstName}
                  placeholder='First name'
                />
                <TextInput
                  style={formStyles.input}
                  onChangeText={this.onChangeEmail}
                  value={this.state.email}
                  placeholder='Email address'
                />
                <TextInput
                  style={formStyles.input}
                  onChangeText={this.onChangePassword}
                  value={this.state.password}
                  placeholder='Password (8+ characters)'
                  secureTextEntry
                />
                <TextInput
                  style={formStyles.input}
                  onChangeText={this.onChangePasswordConfirmation}
                  value={this.state.passwordConfirmation}
                  placeholder='Password confirmation'
                  secureTextEntry
                />
                <TouchableOpacity
                  style={formStyles.button}
                  onPress={() => this.submit(createUser, client)}
                >
                  <Text style={formStyles.text}>Let's do this</Text>
                </TouchableOpacity>
                {this.state.errors.map((error, index) => <Text key={index}>{error}</Text>)}
              </View>
            }
          </Mutation>
        }
      </ApolloConsumer>
    );
  }
}