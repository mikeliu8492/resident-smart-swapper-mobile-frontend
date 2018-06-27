import React, {Component} from 'react';
import {Text} from 'react-native';
import {Button, Card, CardSection, Header, Input, Spinner} from './common'

import firebase from 'firebase';

import {Actions} from 'react-native-router-flux'

export default class PasswordReset extends Component {
  state = {
    email: "mikeliu8492@gmail.com",
    error: "",
    loading: false,
  }

  sendResetMessage() {
    this.setState({loading: true})

    firebase.auth().sendPasswordResetEmail(this.state.email)
    .then(() => {
      this.setState({loading: false})
      Actions.pop();
    })
    .catch(err => {
      this.setState({error: err.toString(), loading: false})
      console.log(err.toString())
    })
  }

  renderSubmit() {
    if(this.state.loading) {
      return <Spinner size="small"/>
    }

    return(
      <Button onPress={this.sendResetMessage.bind(this)}>
        Reset Password
      </Button>
    )
  }

  render() {
    return (
      <Card>       
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
          {/*
              <Button onPress={this.sendResetMessage.bind(this)}>
                Reset Password
              </Button>
          */}
          {this.renderSubmit()}
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