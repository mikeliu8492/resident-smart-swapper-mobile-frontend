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

  renderContinueButton() {
    if(this.props.targetSelf === true) {
      return <Button onPress={() => Actions.Calendar({title: "Other Residents' Shifts", targetSelf: false})}>View Other Resident's Shifts!</Button>
    }
    else {
      return <Button onPress={() => Actions.EligibleShifts()}>See your eligible swap!</Button>
    }
  }

  render() {
    return (
      <View>
          <CardSection>
            <Button onPress={this.goHome.bind(this)}>Go Home!</Button>
          </CardSection>
          <CardSection>
            {this.renderContinueButton()}
          </CardSection>
          <CardSection>
            <Text>I am the calendar!  I am the user's own:  {this.props.targetSelf.toString()}</Text>
          </CardSection>
          
      </View>
    );
  }
}