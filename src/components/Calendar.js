import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Button, Card, CardSection, Header, Input, Spinner} from './common'

import axios from 'axios'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import moment from 'moment-timezone'


class Calendar extends React.Component{

  state = {
      programName: "",
      specialty: "",
      shiftList: []
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


  renderShiftList() {
      return this.state.shiftList.map(shift => 
      {
          const localStart = new Date(shift.start_shift)
          const localEnd = new Date(shift.end_shift)

          
          let gmtDateTime = moment(shift.start_shift)
          const formatStart = gmtDateTime.local().format('MM/DD/YY h:mm a');

          gmtDateTime = moment(shift.end_shift)
          const formatEnd = gmtDateTime.local().format('MM/DD/YY h:mm a');


          return(
              <CardSection key= {shift._id}>
                  <View style={{flex: 1, backgroundColor: 'white'}}>
                      <Text>Start Shift:  {formatStart}</Text>
                      <Text>End Shift:  {formatEnd}</Text>
                  </View>
              </CardSection>
          )

      }

      )
  }

  render() {
      const currentLoggedUser = this.props.currentLoggedUser.userInfo

      return(
          <ScrollView style={{flex: 1}}>
              <CardSection>
                <Button onPress={this.goHome.bind(this)}>Go Home!</Button>
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
      userIsPresent: state.currentLoggedUser !== null
  }
};

export default connect(mapStateToProps) (Calendar)