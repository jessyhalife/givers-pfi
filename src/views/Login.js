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
  Toast
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
            toastMessage: `Hola de vuelta ${
              firebaseApp.auth().currentUser.displayName
            }!. Hoy un gran día para dar una mano!`
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
            loading: false
          });
        });
    } else {
      this.setState({
        loading: false,
        error: true,
        errorMessage: "Debe completar todos los campos"
      });
    }
  };
  render() {
    return (
      <Root>
        <Container>
          <ScrollView>
            <Content>
              <View style={{ padding: 30, marginTop: 100 }}>
                <H1>Iniciar sesión</H1>
              </View>
              <View style={styles.content}>
                <Form>
                  <Item>
                    <Label>Email</Label>
                    <Input
                      onChange={e => {
                        this.setState({ email: e.nativeEvent.text });
                      }}
                      placeholder="example@mail.com"
                      placeholderTextColor="#ddd"
                    />
                  </Item>
                  <Item last>
                    <Label>Contraseña</Label>
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
                            text:
                              "Ya te enviamos un e-mail. Revisá tu bandeja de entrada!",
                            buttonText: "top",
                            duration: 6000,
                            position: "bottom",
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
            </Content>
          </ScrollView>
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
