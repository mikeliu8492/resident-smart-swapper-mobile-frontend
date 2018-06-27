import React from 'react';
import { Text, View } from 'react-native';

import {Card, CardSection, Header} from './common'
import {Button} from './common'
import firebase from 'firebase';

import {connect} from 'react-redux';
import * as actions from '../actions';

import {Actions} from 'react-native-router-flux';


class Home extends React.Component {
  
  componentDidMount() {
    if(this.props.userIsPresent) {
      console.log("I AM HERE!!!!!")
      console.log(this.props.currentLoggedUser)
    }
  }


  logOut() {
    firebase.auth().signOut()
    .then(() => {
      this.props.setCurrentUser(null)
      if(firebase.auth().currentUser === null){
        console.log("LOGOUT CONFIRMED!!!!!")
        Actions.auth()
      }
      else {
        console.log("ERROR!!!!!")
      }
      
    })
    .catch(err => {
      console.log(err.toString())
    })
  }

  renderWelcomeInformation() {
    const currentLoggedUser = this.props.currentLoggedUser;

    if(this.props.userIsPresent) {
      return(
        <View style={{flex:1}}>
          <Text>Welcome {this.props.currentLoggedUser.first_name} {currentLoggedUser.last_name}</Text>
          <Text>ID:  {currentLoggedUser._id}</Text>
          <Text>YEAR:  {currentLoggedUser.year}</Text>
        </View>
      )
    }

    return         
      <View style={{flex:1}}>
        <Text>No user logged in!!!</Text>
      </View>

  }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Card>
          <CardSection>
            <Button onPress={() => Actions.calendar()}>
              Calendar
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={() => Actions.Inbox()}>
              Inbox
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={() => Actions.Outbox()}>
              Outgoing Requests
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={() => Actions.UserSettings()}>
              Settings
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.logOut()}>
              Log Out
            </Button>
          </CardSection>

          <CardSection>
            {this.renderWelcomeInformation()}
          </CardSection>

        </Card>
      </View>
    );
  }
}



// Redux boilerplate!
const mapStateToProps = (state, ownProps) => {
  return {
      currentLoggedUser: state.currentLoggedUser,
      userIsPresent: state.currentLoggedUser !== null
  }
};

export default connect(mapStateToProps, actions) (Home)