import React, { Component } from "react";
import { THEMECOLOR } from "../../const";
import firebaseApp from "../../config";

import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

export default class Welcome extends Component {
  componentDidMount() {
    this._checkAuth();
  }
  _checkAuth = () => {
    firebaseApp.auth().onAuthStateChanged(user => {
      console.log(user);
      this.props.navigation.navigate(user ? "Map" : "Main");
    });
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: THEMECOLOR }}>
        <Image
          style={{ height: 100, width: null, flex: 1, marginTop: 100 }}
          source={require("../assets/img/givers_blanco.png")}
        />
        <ActivityIndicator size="large" color={THEMECOLOR}></ActivityIndicator>
      </View>
    );
  }
}
