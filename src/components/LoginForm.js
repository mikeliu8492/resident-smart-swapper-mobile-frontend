// View Components
import React, {Component} from 'react';
import {Text} from 'react-native';
import {Button, Card, CardSection, Header, Input, Spinner} from './common'

// Redux Services
import {connect} from 'react-redux';
import * as actions from '../actions';

// Third-party libraries
import firebase from 'firebase';
import axios from 'axios';

//Import environmental variables
import { 
  FIREBASE_API_KEY, 
  FIREBASE_AUTH_DOMAIN, 
  FIREBASE_DB_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID
}
from 'react-native-dotenv'

class LoginForm extends Component {
  state = {
    email: "ugob1985@gmail.com",
    password: "123456",
    error: "",
    loading: false
  }

  componentWillMount() {
    const config = {
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      databaseURL: FIREBASE_DB_URL,
      projectId: FIREBASE_PROJECT_ID,
      storageBucket: FIREBASE_STORAGE_BUCKET,
      messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
    };

    firebase.initializeApp(config);
  }


  tryLogin () {
    this.setState({error: "", loading: true})

    const {email, password} = this.state
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      return firebase.auth().currentUser.getIdToken(false)
    })
    .then(ID_TOKEN => {
      const AuthStr = 'Bearer '.concat(ID_TOKEN); 
      return axios.get("https://resident-smart-swapper.herokuapp.com/verify_id_token", { headers: { Authorization: AuthStr } })
    })
    .then(response => {
      this.props.setCurrentUser(response.data.user)
      this.onLoginSuccess()
    })
    .catch(err => {
      console.log(err.toString())
      this.setState({loading: false, error: "Email or Password is incorrect"})
    })
  }

  onLoginSuccess() {
    this.setState({email: '', 
      password: '', 
      loading: false,
      error: ""
    });


    
    this.props.navigation.navigate('Home')
  }

  redirectToRegister() {
    this.props.navigation.navigate('Registration')
  }

  passwordForget() {
    this.props.navigation.navigate('PasswordReset')
  }

  renderButton() {
    if(this.state.loading) {
      return <Spinner size="small"/>
    }

    return(
      <Button onPress={this.tryLogin.bind(this)}>
        Login
      </Button>
    )
  }

  render() {
    console.log("THIS IS THE START OF LOGIN RENDER")
    console.log(this.props.currentLoggedUser)
    return (
      <Card>
        <Header headerText="Please Sign In"/>
        
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
            placeholder="password"
            label="Password"
            value= {this.state.password} 
            onChangeText={password => this.setState({password})}
            secureTextEntry={true}
          />
        </CardSection>
        
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <CardSection>
          <Button onPress={this.passwordForget.bind(this)}>
            Forget Your Password?
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.redirectToRegister.bind(this)}>
            Register As New User
          </Button>
        </CardSection>
      </Card>
      
    );
  }
}

const styles= {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
      currentLoggedUser: state.currentLoggedUser
  }
};

export default connect(mapStateToProps, actions) (LoginForm)