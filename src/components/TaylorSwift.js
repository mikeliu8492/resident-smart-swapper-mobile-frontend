import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AlbumList from './AlbumList';
import {Header} from './common'

export default class TaylorSwift extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Header headerText="Album List"/>
        <AlbumList/>
      </View>
    );
  }
}