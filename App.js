// Boilerplate
import React from 'react';
import ReactNative from 'react-native';

// Redux Imports
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './src/reducers';

//IMPORT NavRouter
import NavRouter from './src/components/NavRouter'

//IMPORT Firebase and Initialize
import firebase from 'firebase'

import { 
  FIREBASE_API_KEY, 
  FIREBASE_AUTH_DOMAIN, 
  FIREBASE_DB_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID
}
from 'react-native-dotenv'



export default App = () => {

  const config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DB_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
  };

  firebase.initializeApp(config);


  console.log("ROUTER MOVED TO DIFFERENT PLACE!!!!!")
  return (
    <Provider store={createStore(reducers)}>
      <NavRouter/>
    </Provider>
  )
}

ReactNative.AppRegistry.registerComponent('resident-smart-swapper', ()=> App);



//FUNCTIONALITY FOR REDUX STORES LEARNING
import LibraryList from './src/components/LibraryList'