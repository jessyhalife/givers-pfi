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
    user: {}
  };
  componentWillMount() {
    this.setState({ user: firebaseApp.auth().currentUser }, () => {});
  }

  async componentDidMount() {
    await firebaseApp
      .auth()
      .getUser("nhDqe1Rf6oX59ZLUeWMnYmaB7j13")
      .then(d => {
        console.log(d);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <View>
        <ScrollView>
          <Header
            showBack={true}
            title={`Hola, ${this.state.user.displayName &&
              this.state.user.email}`}
            back={() => {
              this.navigation.goBack();
            }}
          />
          <Text>Tus datos</Text>
          <Text>{this.state.user.email}</Text>
          <Input
            value={this.state.username}
            onChange={e => this.setState({ username: e.nativeEvent.text })}
          ></Input>
          <Button
            onPress={() =>
              firebaseApp
                .auth()
                .currentUser.updateProfile({
                  displayName: "Jane Q. User",
                  photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(function() {
                  // Update successful.
                  this.setState({ user: firebaseApp.auth().currentUser });
                })
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
