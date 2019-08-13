import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Icon
} from "native-base";

import firebaseApp from "../config/config";
export default class ToolBar extends Component {
  constructor(props) {
    super(props);
  }
  _signOut() {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Main");
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button vertical active>
            <Icon name="pin" />
            <Text>explorar</Text>
          </Button>
          <Button vertical>
            <Icon name="search" />
            <Text>Buscar</Text>
          </Button>
          <Button vertical>
            <Icon name="list" />
            <Text>Mi actividad</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({});
