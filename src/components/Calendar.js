import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button, Card, CardSection, Header, Input, Spinner} from './common'

import firebase from 'firebase';

export default class Calendar extends React.Component {
  /*
  displayCalendar() {
    if(firebase.auth().currentUser !== null) {
      <Text>This is calendar.  Should be visible only to some.  You are lucky</Text>
    }
    else {
      <Text>YOu shouldn't be here.  YOu should go.</Text>
    }
  }
  */
  componentWillMount() {
    if(firebase.auth().currentUser !== null) {
      console.log("I should be here!")
    }
    else {
      console.log("Intruder alert!!!!!")
    }
  }

  render() {
    return (
      <View>
          <Text>I am the calendar!</Text>
      </View>
    );
  }
}