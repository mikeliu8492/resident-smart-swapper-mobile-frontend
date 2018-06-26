import React from 'react';
import ReactNative, { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator} from 'react-navigation';

import {Header} from './src/components/common';

// Redux Imports
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import reducers from './src/reducers';

// Form Imports
import Home from './src/components/Home';
import RegistrationForm from './src/components/RegistrationForm';
import Calendar from './src/components/Calendar';
import LoginForm from './src/components/LoginForm';
import TaylorSwift from './src/components/TaylorSwift';
import PasswordResetForm from './src/components/PasswordResetForm';
import UserSettings from './src/components/UserSettings';
import Inbox from './src/components/Inbox';
//import {UserProvider} from './src/components/UserContext'

//import firebase from 'firebase';

import LibraryList from './src/components/LibraryList'


const ReactNativeNavigator = createStackNavigator({
  Login: {screen: LoginForm},
  Home: { screen: Home },
  Registration: { screen: RegistrationForm },
  Calendar: {screen: Calendar},
  Inbox: {screen: Inbox},
  PasswordReset: {screen: PasswordResetForm},
  Swift: {screen: TaylorSwift},
  UserSettings: {screen: UserSettings}
})


export default App = () => {
  return (
    <Provider store={createStore(reducers)}>
      {/*
            <View style={{flex: 1}}>
        <Header headerText="Tech Stack"/>
        <LibraryList/>
      </View>
      */}

      
      
      <ReactNativeNavigator/>
      
    </Provider>
  )
}


//



ReactNative.AppRegistry.registerComponent('resident-smart-swapper', ()=> App);