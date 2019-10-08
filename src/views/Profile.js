import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  Input,
  Item,
  Badge,
  DatePicker,
  Textarea,
  Picker,
  Button
} from "native-base";
import Header from "../components/header";
import Icon from "react-native-vector-icons/AntDesign";
import firebaseApp from "../config";
import { THEMECOLOR } from "../const";

export default class Profile extends Component {
  state = {
    user: {},
    username: ""
  };

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      this.setState({ user: user });
    });
  }

  render() {
    var { user } = this.state;
    return (
      <View>
        <ScrollView>
          <Header
            showBack={true}
            title={`Hola, ${user.displayName}`}
            back={() => {
              this.navigation.goBack();
            }}
          />
          
          <Button
            onPress={() =>
              firebaseApp
                .auth()
                .currentUser.updateProfile({
                  displayName: this.state.username
                })
                .then(function() {})
                .catch(function(error) {
                  // An error happened.
                })
            }
          >
            <Text>Poner usuario</Text>
          </Button>
          <Button
            style={{ backgroundColor: THEMECOLOR }}
            onPress={() => {
              firebaseApp.auth().signOut();
            }}
          >
            <Text>Cerrar sesión</Text>
          </Button>
        </ScrollView>
      </View>
    );
  }
}
