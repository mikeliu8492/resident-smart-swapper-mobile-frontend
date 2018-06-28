import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button, Card, CardSection, Header, Input, Spinner, Confirm} from './common'

import {Actions} from 'react-native-router-flux'

export default class EligibleShifts extends Component {
  state = {
    nextPageModalVisible: false,
    goHomeModalVisible: false
  }

  renderContinueButton() {
    if(this.props.targetSelf === true) {
      return <Button onPress={this.renderNextModal.bind(this)}>View Other Resident's Shifts!</Button>
    }
    else {
      return <Button onPress={this.renderNextModal.bind(this)}>See your eligible swap!</Button>
    }
  }

  goHome() {
    Actions.main()
  }
  showNextModal () {
    this.setState({nextPageModalVisible: true})
  }

  showHomeModal() {
    this.setState({goHomeModalVisible: true})
  }

  renderGoHomeConfirmModal() {
    return(
      <Confirm 
        onAccept={this.goHome.bind(this)} 
        onDecline={() => this.setState({goHomeModalVisible: false})} 
        visible={this.state.goHomeModalVisible} 
      >
        WARNING:  This will exit you from the current process and clear all data in your request flow.  
        Are you sure you want to go to the homepage?
      </Confirm>
    )
  }

  // TO DO:  Make a confirmation page for this to go to.
  submitTradeRequest() {
      console.log("I SUBMITTED TRADE REQUEST!!!!!")
      this.setState({nextPageModalVisible: false})
      Actions.ConfirmRequestSent()
  }


  renderNextPageConfirmModal() {
    return(
      <Confirm 
        onAccept={this.submitTradeRequest.bind(this)} 
        onDecline={() => this.setState({nextPageModalVisible: false})} 
        visible={this.state.nextPageModalVisible} 
      >
        You are about to submit a swap request. Continue?
      </Confirm>
    )
  }

  renderGoHomeConfirmModal() {
    return(
      <Confirm 
        onAccept={this.goHome.bind(this)} 
        onDecline={() => this.setState({goHomeModalVisible: false})} 
        visible={this.state.goHomeModalVisible} 
      >
        WARNING:  This will exit you from the current process and clear all data in your request flow.  
        Are you sure you want to go to the homepage?
      </Confirm>
    )
  }

  render() {
    return (
      <View>
          <CardSection>
            <Button onPress={this.showHomeModal.bind(this)}>Go Home!</Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.showNextModal.bind(this)}>Submit Trade Request!</Button>
          </CardSection>

          {this.renderGoHomeConfirmModal()}
          {this.renderNextPageConfirmModal()}
          <CardSection>
            <Text>I am the eligible shift to swap page!!!!</Text>
          </CardSection>
          
      </View>
    );
  }
}