import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Button, Card, CardSection, Confirm} from './common'

import axios from 'axios'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import moment from 'moment-timezone'


class Calendar extends React.Component{

  state = {
      programName: "",
      specialty: "",
      shiftList: [],
      nextPageModalVisible: false,
      goHomeModalVisible: false
  }
  componentWillMount() {
      const currentLoggedUser = this.props.currentLoggedUser.userInfo

      //Get the user program too
      axios.get(`https://resident-smart-swapper.herokuapp.com/program/${currentLoggedUser.program}`)
      .then(response => {
          const program = response.data.program
          this.setState({
              programName: program.institution,
              specialty: program.specialty
          })

          const userPayload = {
              user: currentLoggedUser._id,
              program: currentLoggedUser.program,
              pgy: currentLoggedUser.year,
              target_self: this.props.targetSelf 
          }

          return axios.post(`https://resident-smart-swapper.herokuapp.com/visualize_shifts`, userPayload)
      })
      .then(response => {
          const shiftList = response.data.calendar_shifts;
          this.setState({
              shiftList: shiftList
          })
      })
      .catch(err => {
          console.log(err.toString())
      })
  }

  goHome() {
    this.setState({goHomeModalVisible: false})
    Actions.main()
  }

  renderContinueButton() {
    if(this.props.targetSelf === true) {
      return <Button onPress={this.renderNextModal.bind(this)}>View Other Resident's Shifts!</Button>
    }
    else {
      return <Button onPress={this.renderNextModal.bind(this)}>See your eligible swap!</Button>
    }
  }


  renderNextModal () {
    this.setState({nextPageModalVisible: true})
  }

  renderHomeModal() {
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

  //TODO:  Abstract function to different component
  renderShiftList() {

      const timezone = this.props.preferredTimezone

      return this.state.shiftList.map(shift => {   
          let gmtDateTime = moment(shift.start_shift)
          const formatStart = gmtDateTime.tz(timezone).format('MM/DD/YY h:mm a');

          gmtDateTime = moment(shift.end_shift)
          const formatEnd = gmtDateTime.tz(timezone).format('MM/DD/YY h:mm a');

          return(
              <CardSection key= {shift._id}>
                  <View style={{flex: 1, backgroundColor: 'white'}}>
                      <Text>Start Shift:  {formatStart}</Text>
                      <Text>End Shift:  {formatEnd}</Text>
                  </View>
              </CardSection>
          )
      })
  }

  renderNextPageConfirmModal() {
    if(this.props.targetSelf === true) {
      return(
        <Confirm 
          onAccept={this.nextCalendarPage.bind(this)} 
          onDecline={() => this.setState({nextPageModalVisible: false})} 
          visible={this.state.nextPageModalVisible} 
        >
          Confirm Your Chosen Shift to Swap
        </Confirm>
      )
    }

    return(
      <Confirm 
        onAccept={this.nextCalendarPage.bind(this)} 
        onDecline={() => this.setState({nextPageModalVisible: false})} 
        visible={this.state.nextPageModalVisible} 
      >
        Confirm Your Day Filter
      </Confirm>
    )
  }

  nextCalendarPage() {
    if(this.props.targetSelf === true){
      this.setState({nextPageModalVisible: false})
      Actions.pop()
      Actions.Calendar({title: "Other Residents' Shifts", targetSelf: false})
    }
    else {
      this.setState({nextPageModalVisible: false})
      Actions.pop()
      Actions.EligibleShifts()
    }
  }

  render() {
      const currentLoggedUser = this.props.currentLoggedUser.userInfo

      return(
          <ScrollView style={{flex: 1}}>
              
              <CardSection>
                <Button onPress={this.renderHomeModal.bind(this)}>Go Home!</Button>
              </CardSection>
              
              <CardSection>
                {this.renderContinueButton()}
              </CardSection>
              
              <CardSection>
                <View style={{flex: 1}}>
                  <Text>Institution:  {this.state.programName}</Text>
                  <Text>Specialty:  {this.state.specialty}</Text>
                  <Text>PGY:  {currentLoggedUser.year}</Text>
                </View>
              </CardSection>
              {this.renderNextPageConfirmModal()}
              {this.renderGoHomeConfirmModal()}
              
              <Card>
                {this.renderShiftList()}
              </Card>
          </ScrollView>
      )

  }
}

// Redux boilerplate!
const mapStateToProps = (state) => {
  return {
      currentLoggedUser: state.currentLoggedUser,
      userIsPresent: state.currentLoggedUser !== null,
      preferredTimezone: state.timezone
  }
};

export default connect(mapStateToProps) (Calendar)