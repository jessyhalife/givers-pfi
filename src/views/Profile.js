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
  Button,
  Switch
} from "native-base";
import Header from "../components/header";
import Icon from "react-native-vector-icons/AntDesign";
import firebaseApp from "../config";
import { THEMECOLOR, THEMECOLORLIGHT } from "../const";

export default class Profile extends Component {
  state = {
    user: {},
    username: "",
    notify_person: true,
    notify_events: true,
    notify_points: true
  };

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      alert(user.displayName);
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
            title={`Hola, ${
              user.displayName === null ? user.email : user.displayName
            }`}
            back={() => {
              this.props.navigation.goBack();
            }}
          />
          <View style={{ borderColor: "#eee", borderBottomWidth: 3 }}></View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold", margin: 20 }}>
              Quiero recibir notificaciones sobre:
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              margin: 20,
              justifyContent: "space-between"
            }}
          >
            <Text style={{ fontSize: 18 }}>Personas que registré o ayudé</Text>
            <Switch
              trackColor={{ true: THEMECOLORLIGHT }}
              thumbColor={THEMECOLOR}
              onValueChange={() =>
                this.setState({
                  notify_person: !this.state.notify_person
                })
              }
              value={this.state.notify_person}
            ></Switch>
          </View>
          <View
            style={{
              flexDirection: "row",
              margin: 20,
              justifyContent: "space-between"
            }}
          >
            <Text style={{ fontSize: 18 }}>Eventos que estoy suscripto</Text>
            <Switch
              trackColor={{ true: THEMECOLORLIGHT }}
              thumbColor={THEMECOLOR}
              onValueChange={() =>
                this.setState({
                  notify_events: !this.state.notify_events
                })
              }
              value={this.state.notify_events}
            ></Switch>
          </View>
          <View
            style={{
              flexDirection: "row",
              margin: 20,
              justifyContent: "space-between"
            }}
          >
            <Text style={{ fontSize: 18 }}>Puntos de ayuda que registré</Text>
            <Switch
              trackColor={{ true: THEMECOLORLIGHT }}
              thumbColor={THEMECOLOR}
              onValueChange={() =>
                this.setState({
                  notify_points: !this.state.notify_points
                })
              }
              value={this.state.notify_points}
            ></Switch>
          </View>
          <View
            style={{
              flexDirection: "column",
              textAlign: "center",
              marginTop: 40
            }}
          >
            <Button
              style={{
                backgroundColor: THEMECOLOR,
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
              }}
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
              <Text
                style={{
                  fontWeight: "bold",
                  color: "white",
                  alignSelf: "center"
                }}
              >
                GUARDAR CAMBIOS
              </Text>
            </Button>
            <Button
              bordered
              light
              style={{
                borderColor: "gray",
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
              }}
              onPress={() => {
                firebaseApp.auth().signOut();
              }}
            >
              <Text style={{ fontWeight: "bold", color: THEMECOLOR }}>
                CERRAR SESIÓN
              </Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}
