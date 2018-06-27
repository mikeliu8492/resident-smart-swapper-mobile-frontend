import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button, Card, CardSection, Header, Input, Spinner} from './common'

import firebase from 'firebase';

import {Actions} from 'react-native-router-flux'

export default class Calendar extends React.Component {
  componentWillMount() {
    if(firebase.auth().currentUser !== null) {
      console.log("I should be here!")
    }
    else {
      console.log("Intruder alert!!!!!")
    }
  }


  goHome() {
    Actions.main()
  }

  submitTradeRequest() {
      console.log("I SUBMITTED TRADE REQUEST!!!!!")
      this.goHome()
  }

  render() {
    return (
      <View>
          <CardSection>
            <Button onPress={this.goHome.bind(this)}>Go Home!</Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.submitTradeRequest.bind(this)}>Submit Trade Request!</Button>
          </CardSection>
          <CardSection>
            <Text>I am the eligible shift to swap page!!!!</Text>
          </CardSection>
          
      </View>
    );
  }
}