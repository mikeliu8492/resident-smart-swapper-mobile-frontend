import React, {Component} from 'react';
import {Text, Picker, ScrollView} from 'react-native';
import {Button, Card, CardSection, CustomPicker, Confirm, Input, Spinner} from './common'

import axios from 'axios';

// Redux Import
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {timezoneUpdate} from  '../actions/';

// Timezone Constants
import {PT, MT, CT, ET} from '../utility/Constants'

// User Friendly Constants
const PT_STRING = "Pacific Time"
const MT_STRING = "Mountain Time"
const CT_STRING = "Central Time"
const ET_STRING = "Eastern Time"

class UserSettings extends Component {

  state = {
    firstName: "",
    lastName: "",
    timezone: "",
    tzString: "",
    error: "",
    loading: false,
    confirmVisible: false
  }

  componentWillMount() {
    this.setState({
      timezone: this.props.timezone,
      firstName: this.props.currentLoggedUser.userInfo.first_name,
      lastName: this.props.currentLoggedUser.userInfo.last_name
    })

    this.setTzString(this.state.timezone)
  }

  setTzString(enumValue) {
    console.log(`Enum value is: ${enumValue}`)
    console.log(`CENTRAL IS:  ${CT}`)
    switch(enumValue) {
      case PT:
        this.setState({tzString: PT_STRING})
        break;
      case MT:
        this.setState({tzString: MT_STRING})
        break;
      case CT:
        this.setState({tzString: CT_STRING})
        break;
      default:
        this.setState({tzString: ET_STRING})
    }
  }

  tryChangeSettings () {
    this.props.timezoneUpdate(this.state.timezone)
    Actions.pop();
  }

  renderButton() {
    if(this.state.loading) {
      return <Spinner size="small"/>
    }

    return(
      <Button onPress={() => {this.setState({confirmVisible: true})}}>
        Save Settings
      </Button>
    )
  }

  renderConfirmModal () {
    return(
      <Confirm 
        onAccept={this.tryChangeSettings.bind(this)} 
        onDecline={() => this.setState({confirmVisible: false})} 
        visible={this.state.confirmVisible} 
      >
        <Text>Save the following settings? Timezone:  {this.state.tzString}</Text>
      </Confirm>
    )
  }

  render() {
    console.log(this.state)
    return (
      <ScrollView>
        {this.renderConfirmModal()}
        <Card>
          <CardSection>
            <Input
              placeholder="John"
              label="First Name"
              value= {this.state.firstName} 
              onChangeText={firstName => this.setState({firstName})}
              secureTextEntry={false}
            />
          </CardSection>

          <CardSection>
            <Input
              placeholder="Doe"
              label="Last Name"
              value= {this.state.lastName} 
              onChangeText={lastName => this.setState({lastName})}
              secureTextEntry={false}
            />
          </CardSection>

          <CardSection style={{flexDirection: 'row', alignItems: 'center',}}>
            <Text style={styles.pickerTextStyle}> Timezone</Text>
            <Picker
              style={styles.onePicker}
              itemStyle={styles.onePickerItem}
              selectedValue={this.state.timezone}
              onValueChange={(timezone) => {
                this.setState({timezone: timezone})
                this.setTzString(timezone)
              }}>
              <Picker.Item label= {"Pacific Time"} value = {PT} />
              <Picker.Item label= {"Mountain Time"} value= {MT} />
              <Picker.Item label= {"Central Time"} value= {CT} />
              <Picker.Item label= {"Eastern Time"} value= {ET} />
            </Picker>
          </CardSection>
      
          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>

          <CardSection>
            {this.renderButton()}
          </CardSection>

        </Card>
      </ScrollView>
    );
  }
}

const styles= {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  onePicker: {
    height: 50,
    paddingHorizontal: 5,
    flex: 2,
  },
  onePickerItem: {
    height: 50,
    color: 'blue',
    fontWeight: 'bold',
  }
}

const mapStateToProps = (state) => { 
  console.log("MAPPING STATE")
  console.log(state.timezone)
  return { 
    timezone: state.timezone,
    currentLoggedUser: state.currentLoggedUser 
  };
};


export default connect(mapStateToProps, {timezoneUpdate}) (UserSettings);