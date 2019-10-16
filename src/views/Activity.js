import React, { Component } from "react";
import { View, ActivityIndicator, Text, StatusBar, Image } from "react-native";
import { Tabs, Tab, Container } from "native-base";
import { THEMECOLOR } from "../const.js";
export default class Activity extends Component {
  render() {
    return (
      <View>
        <Image
          style={{
            height: 150,
            width: 150,
            marginTop: 10,
            alignSelf: "center"
          }}
          source={require("../assets/img/map.png")}
        ></Image>
      </View>
    );
  }
}
