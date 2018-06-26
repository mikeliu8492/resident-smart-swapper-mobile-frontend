import React, {Component} from 'react';
import {Text, Picker, ScrollView} from 'react-native';
import {Button, Card, CardSection, CustomPicker, Header, Input, Spinner} from './common'

import firebase from 'firebase';
import axios from 'axios';

// Redux Services
import {connect} from 'react-redux';
import * as actions from '../actions';

class RegistrationForm extends Component {

  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    program: "5aad778b5510ca04d47dc965",
    year: 1,
    error: "",
    loading: false
  }


  tryRegister () {

    const dbPayloadBody = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      year: this.state.year,
      email: this.state.email,
      program: this.state.program,
      password: this.state.password
    }

    axios.post("https://resident-smart-swapper.herokuapp.com/user", dbPayloadBody)
    .then(response => {
      if(response.request.status !== 201)
      {
        if(response.request.status === 422){
          this.setState({error:  "One or more fields is invalid"})
        }

        throw new Error("An error has occured")
      }
      
      return firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    })
    .then(() => {
      return firebase.auth().currentUser.getIdToken(false)
    })
    .then(ID_TOKEN => {
      const AuthStr = 'Bearer '.concat(ID_TOKEN); 
      return axios.get("https://resident-smart-swapper.herokuapp.com/verify_id_token", { headers: { Authorization: AuthStr } })
    })
    .then(response => {
      this.props.setCurrentUser(response.data.user)
      this.props.navigation.navigate("Home")
    })
    .catch(err => {
      console.log(err.toString())
    })
  }

  renderButton() {
    if(this.state.loading) {
      return <Spinner size="small"/>
    }

    return(
      <Button onPress={this.tryRegister.bind(this)}>
        Register
      </Button>
    )
  }

  render() {
    
    return (
      <ScrollView>
        <Card>
          <Header headerText="Register As New User"/>
          
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

          <CardSection>
            <Input
              placeholder="user@gmail.com"
              label="Email"
              value= {this.state.email} 
              onChangeText={email => this.setState({email})}
              secureTextEntry={false}
            />
          </CardSection>

          <CardSection>
            <Input
              placeholder="Password"
              label="Password"
              value= {this.state.password} 
              onChangeText={password => this.setState({password})}
              secureTextEntry={true}
            />
          </CardSection>

          <CardSection style={{flexDirection: 'row', alignItems: 'center',}}>
            <Text style={styles.pickerTextStyle}> Program</Text>
            <Picker
              style={styles.onePicker}
              itemStyle={styles.onePickerItem}
              selectedValue={this.state.program}
              onValueChange={(year) => this.setState({year: program})}>
              <Picker.Item label="UMass EM" value = "5aad778b5510ca04d47dc965" />
            </Picker>
          </CardSection>

          <CardSection style={{flexDirection: 'row', alignItems: 'center',}}>
            <Text style={styles.pickerTextStyle}> Year</Text>
            <Picker
              style={styles.onePicker}
              itemStyle={styles.onePickerItem}
              selectedValue={this.state.year}
              onValueChange={(year) => this.setState({year: year})}>
              <Picker.Item label="PGY1" value = {1} />
              <Picker.Item label="PGY2" value= {2} />
              <Picker.Item label="PGY3" value= {3} />
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

const mapStateToProps = (state, ownProps) => {
  return {
      currentLoggedUser: state.currentLoggedUser
  }
};

export default connect(mapStateToProps, actions) (RegistrationForm)