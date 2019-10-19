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
  Switch,
  Toast,
  Root
} from "native-base";
import Header from "../components/header";
import Icon from "react-native-vector-icons/AntDesign";
import firebaseApp from "../config";
import { THEMECOLOR, THEMECOLORLIGHT } from "../const";

export default class Profile extends Component {
  state = {
    user: {},
    username: "",
    notify_people: true,
    notify_events: true,
    notify_points: true,
    idToken: "",
    showToast: false
  };

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      this.setState({ user: user }, () => {
        firebaseApp
          .auth()
          .currentUser.getIdToken()
          .then(idToken => {
            this.setState({ idToken });
            fetch(
              `https://us-central1-givers-229af.cloudfunctions.net/webApi/users`,
              {
                method: "GET",
                headers: new Headers({
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: idToken
                })
              }
            )
              .then(response => {
                return response.json();
              })
              .then(json => {
                let { notify_events, notify_people, notify_points } = json;
                this.setState({
                  notify_events: notify_events == "true",
                  notify_points: notify_points == "true",
                  notify_people: notify_people == "true"
                });

                return;
              })
              .catch(error => {
                console.log(error);
              });
          });
      });
    });
  }

  saveSettings(idToken) {
    var body = {
      notify_people: this.state.notify_people,
      notify_points: this.state.notify_points,
      notify_events: this.state.notify_events
    };
    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/users/notifications`,
      {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: idToken
        })
      }
    )
      .then(response => {
        Toast.show({
          text: "¡Se guardaron tus cambios!",
          buttonText: "Okey",
          duration: 6000,
          position: "top",
          type: "success",
          textStyle: { fontSize: 14 }
        });
        return;
      })
      .catch(error => {
        Toast.show({
          text: error,
          buttonText: "Okey",
          duration: 6000,
          type: "danger",
          position: "top",
          textStyle: { fontSize: 14 }
        });
      });
  }

  render() {
    var { user } = this.state;
    return (
      <Root>
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
              <Text style={{ fontSize: 18 }}>
                Personas que registré o ayudé
              </Text>
              <Switch
                trackColor={{ true: THEMECOLORLIGHT }}
                thumbColor={THEMECOLOR}
                onValueChange={() =>
                  this.setState({
                    notify_people: !this.state.notify_people
                  })
                }
                value={this.state.notify_people}
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
                onPress={() => this.saveSettings(this.state.idToken)}
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
      </Root>
    );
  }
}
