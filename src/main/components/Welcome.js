import React, { Component } from "react";
import {THEMECOLOR} from '../../const';
import firebaseApp from '../../config';

import { View, 
        ActivityIndicator,
        Text, 
        StyleSheet 
      } from "react-native";

export default class Welcome extends Component {
  componentDidMount(){
    this._checkAuth();
  }
  _checkAuth = () =>{
    firebaseApp.auth().onAuthStateChanged((user) => {
        console.log(user);
        this.props.navigation.navigate(user ? 'Home' : 'Main');
    });
  }
  render() {
    console.log(THEMECOLOR)
    return (
      <View style={{flex: 1}}>
        <Text>Welcome back!</Text>
        <ActivityIndicator size="large" color={THEMECOLOR}></ActivityIndicator>
      </View>
    );
  }
}