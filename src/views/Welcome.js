import React, { Component } from "react";
import { THEMECOLOR } from "../const";
import firebaseApp from "../config";
import {
  Image,
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  StatusBar
} from "react-native";

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this._checkAuth = this._checkAuth.bind(this);
  }
  componentDidMount() {
    
    setTimeout(() => {
      this._checkAuth();
    }, 1000);
  }
  _checkAuth = () => {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("MapScreen");
      } else {
        this.props.navigation.navigate("Main");
      }
    });
  };
  render() {
    return (
      <View style={{ backgroundColor: THEMECOLOR, flex: 1 }}>
        <StatusBar backgroundColor={THEMECOLOR} barStyle="dark-content" />
        <Image
          style={{
            height: 100,
            width: 400,
            flex: 1,
            marginTop: 10,
            resizeMode: "contain"
          }}
          source={require("../assets/img/givers_blanco.png")}
        />
      </View>
    );
  }
}
