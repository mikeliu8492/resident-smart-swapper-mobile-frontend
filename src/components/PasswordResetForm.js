import React, {Component} from 'react';
import {Text} from 'react-native';
import {Button, Card, CardSection, Header, Input, Spinner} from './common'

import firebase from 'firebase';

export default class PasswordReset extends Component {
  state = {
    email: "mikeliu8492@gmail.com",
    error: ""
  }

  sendResetMessage() {
    firebase.auth().sendPasswordResetEmail(this.state.email)
    .then(result => {
      console.log("Message sent!")
      this.props.navigation.navigate('Login')
    })
    .catch(err => {
      this.setState({error: err.toString()})
      console.log(err)
    })
  }

  render() {
    return (
      <Card>
        <Header headerText="Reset Password"/>
        
        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value= {this.state.email} 
            onChangeText={email => this.setState({email})}
            secureTextEntry={false}
          />
        </CardSection>

        
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          <Button onPress={this.sendResetMessage.bind(this)}>
            Reset Password
          </Button>
        </CardSection>
      </Card>
      
    );
  }
}

const styles= {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}