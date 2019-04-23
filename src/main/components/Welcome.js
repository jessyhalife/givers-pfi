import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

export default class Welcome extends Component {
  render() {
    return (
        <View style={{flex:1}}>
            <Image style={{  
                    width: 40,
                    height: 40,
                    }} source={require('../../assets/img/logo.png')}></Image>
            <Text>welcome je</Text>
        </View>
    );
  }
}
