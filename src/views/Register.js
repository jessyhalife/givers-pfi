import React, { Component } from "react";
import {
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import firebaseApp from "../config";
import {
  Container,
  Form,
  Item,
  Input,
  Label,
  Toast,
  Text,
  Button,
  CheckBox,
  ListItem,
  Body,
  Root
} from "native-base";
import Header from "../components/header";
import { THEMECOLOR } from "../const.js";

export default class Register extends Component {
  state = {
    error: false,
    email: null,
    username: null,
    password: null,
    formOK: false,
    loading: false,
    terms: false,
    errorMessage: "",
    showToast: false
  };

  _handleRegister = () => {
    this.setState({ loading: true });

    let { email, password, username } = this.state;
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        if (userCredentials.user) {
          userCredentials.user
            .updateProfile({ displayName: username })
            .then(s => {
              this.setState({ error: false, loading: false });
              Toast.show({});
            });
        }
      })
      .catch(error => {
        this.setState(
          {
            error: true,
            loading: false,
            errorMessage: error.toString()
          },
          () => {
            Toast.show({
              text: error.toString(),
              buttonText: "Okey",
              duration: 6000,
              position: "bottom",
              type: "danger",
              textStyle: { fontSize: 14 }
            });
          }
        );
      });
  };

  componentWillUnmount() {}
  render() {
    return (
      <Root>
        <Container>
          <View style={{ marginTop: 30 }}>
            <Header title="Crear nueva cuenta" />
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 60,
                marginLeft: 30,
                marginRight: 30,
                elevation: 3,
                padding: 10,
                marginTop: 40
              }}
            >
              <View style={styles.content}>
                <Form>
                  <Item error={this.state.error}>
                    <Label>Nombre de usuario</Label>
                    <Input
                      onChange={e => {
                        this.setState({ username: e.nativeEvent.text });
                      }}
                      placeholder="janeDoe"
                      placeholderTextColor="#ddd"
                    />
                  </Item>
                  <Item error={this.state.error}>
                    <Label>Email</Label>
                    <Input
                      onChange={e => {
                        this.setState({ email: e.nativeEvent.text });
                      }}
                      placeholder="example@mail.com"
                      placeholderTextColor="#ddd"
                    />
                  </Item>
                  <Item last error={this.state.error}>
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
              <View />
              <View>
                <ListItem>
                  <CheckBox
                    checked={this.state.terms}
                    onPress={() => {
                      this.setState({ terms: !this.state.terms });
                    }}
                  />
                  <Body>
                    <TouchableOpacity>
                      <Text>Acepto términos y condiciones de uso</Text>
                    </TouchableOpacity>
                  </Body>
                </ListItem>
              </View>
              <View style={styles.buttons}>
                <Button
                  disabled={!this.state.terms}
                  rounded
                  onPress={this._handleRegister}
                  style={{
                    padding: 20,
                    backgroundColor: this.state.terms ? THEMECOLOR : "lightgray"
                  }}
                >
                  {this.state.loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text>Crear cuenta</Text>
                  )}
                </Button>
                <Button
                  transparent
                  onPress={() => {
                    this.props.navigation.navigate("Login");
                  }}
                >
                  <Text style={{ color: THEMECOLOR }}>Iniciar sesión</Text>
                </Button>
              </View>
            </View>
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
