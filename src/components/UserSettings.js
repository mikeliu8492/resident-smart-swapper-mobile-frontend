import React, {Component} from 'react';
import {Text, Picker, ScrollView} from 'react-native';
import {Button, Card, CardSection, CustomPicker, Header, Input, Spinner} from './common'

import firebase from 'firebase';
import axios from 'axios';

export default class UserSettings extends Component {

  state = {
    firstName: "",
    lastName: "",
    program: "5aad778b5510ca04d47dc965",
    year: 1,
    error: "",
    loading: false
  }

  componentWillMount() {
    /*
    if(firebase.auth().currentUser !== null)
    {
      firebase.auth().currentUser.getIdToken(false)
      .then(token => {
        console.log(`TOKEN IS:  ${token}`)
        console.log(firebase.auth().currentUser.email)
        const AuthStr = 'Bearer '.concat(token); 
        return axios.get("https://resident-smart-swapper.herokuapp.com/verify_id_token", { headers: { Authorization: AuthStr } })
      })
      .then(response => {
        // If request is good...
        const loggedInUser = response.data.user;
        this.setState({
            firstName: loggedInUser.first_name,
            lastName: loggedInUser.last_name,
            year: loggedInUser.year,
            program: loggedInUser.program,
            email: loggedInUser.email
        })

        console.log(response.data);
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    else {
      console.log("You should not be here!")
    }
    */
  }

  tryRegister () {

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
    console.log(this.state)
    return (
      <ScrollView>
        <Card>
          <Header headerText="Modify User Settings"/>
          
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



    /*
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
    .then(response => {
      this.props.navigation.navigate("Home")
    })
    .catch(err => {
      console.log(err.toString())
    })
    */