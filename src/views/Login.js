import React, { Component } from "react";
import { Image, View, StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import firebaseApp from "../config";
import { THEMECOLOR } from "../const";
import {
  Container,
  Form,
  Item,
  Input,
  Label,
  H1,
  Text,
  Content,
  Button,
  Badge,
  Root,
  Toast,
  Icon
} from "native-base";
import Header from "../components/header";

export default class Main extends Component {
  state = {
    loading: false,
    error: false,
    email: null,
    password: null,
    showToast: false
  };
  _handleLogin = () => {
    let { email, password } = this.state;
    if (email && password) {
      this.setState({ loading: true });
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.props.navigation.navigate("MapScreen", {
            toast: true,
            toastMessage: `Hola ${
              firebaseApp.auth().currentUser.displayName
            } hoy es un gran día para dar una mano!`
          });
        })
        .catch(error => {
          Toast.show({
            text: error.toString(),
            buttonText: "Okey",
            duration: 6000,
            position: "top",
            type: "danger",
            textStyle: { fontSize: 14 }
          });
          this.setState({
            loading: false,
            error: true
          });
        });
    } else {
      this.setState({
        loading: false,
        error: true
      });
    }
  };
  render() {
    return (
      <Root>
        <Container style={{ backgroundColor: "#fcfcfc" }}>
          <View style={{ marginTop: 30 }}>
            <Header title="Iniciar sesión"></Header>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 60,
                marginLeft: 30,
                marginRight: 30,
                elevation: 3,
                padding: 20,
                marginTop: 100
              }}
            >
              <View style={{ ...styles.content }}>
                <Form>
                  <Item error={this.state.error}>
                    {/* <Icon></Icon><Label>Email</Label> */}
                    <Icon name="person" style={{ color: "gray" }}></Icon>
                    <Input
                      onChange={e => {
                        this.setState({ email: e.nativeEvent.text });
                      }}
                      placeholder="example@mail.com"
                      placeholderTextColor="#ddd"
                    />
                  </Item>
                  <Item last error={this.state.error}>
                    <Icon name="lock" style={{ color: "gray" }}></Icon>
                    <Input
                      shake={true}
                      onChange={e => {
                        this.setState({ password: e.nativeEvent.text });
                      }}
                      placeholder="password"
                      placeholderTextColor="#ddd"
                      secureTextEntry={true}
                    />
                  </Item>
                </Form>
              </View>
              <View style={styles.buttons}>
                <Button
                  onPress={this._handleLogin}
                  style={{ padding: 20, backgroundColor: THEMECOLOR }}
                >
                  {this.state.loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text>Iniciar sesión</Text>
                  )}
                </Button>
                <Button
                  transparent
                  onPress={() => {
                    if (this.state.email !== "") {
                      firebaseApp
                        .auth()
                        .sendPasswordResetEmail(this.state.email)
                        .then(data => {
                          Toast.show({
                            text: `Te enviamos un e-mail a ${this.state.email}. Revisá tu bandeja de entrada!`,
                            buttonText: "OKEY",
                            duration: 6000,
                            position: "top",
                            type: "success",
                            textStyle: { fontSize: 14 }
                          });
                        })
                        .catch(err => {
                          Toast.show({
                            text: err.toString(),
                            buttonText: "Okey",
                            duration: 6000,
                            position: "top",
                            type: "danger",
                            textStyle: { fontSize: 14 }
                          });
                        });
                    }
                  }}
                >
                  <Text style={{ color: THEMECOLOR }}>
                    Olvidé mi contraseña
                  </Text>
                </Button>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "gray" }}>Todavía no tenés una cuenta?</Text>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Register")}
            >
              <Text style={{ color: "black" }}>Registrate</Text>
            </Button>
          </View>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginTop: 30,
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30
  },
  buttons: {
    alignItems: "center",
    marginTop: 50
  }
});
