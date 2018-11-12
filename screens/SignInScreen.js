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

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        firstName
        email
      }
      errors
    }
  }
`

export default class SignInScreen extends React.Component {
  state = {
    email: '',
    password: '',
    errors: [],
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

  submit = async (signInMutation, client) => {
    const variables = { 
      email: this.state.email,
      password: this.state.password,
    }
    const response = await signInMutation({ variables })
    const { token, user, errors } = response.data.signIn

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
          <Mutation mutation={SIGN_IN}>
            {signIn =>
              <View style={formStyles.container}>
                <View style={formStyles.headerContainer}>
                  <View style={formStyles.horizontalRule}></View>
                  <Text style={formStyles.header}>Log in with email</Text>
                  <View style={formStyles.horizontalRule}></View>
                </View>
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
                <TouchableOpacity
                  style={formStyles.button}
                  onPress={() => this.submit(signIn, client)}
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