import React, { Component } from "react";
import { Image, View, StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import firebaseApp from "../config";
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
  Badge
} from "native-base";

export default class Main extends Component {
  state = {
    loading: false,
    error: false,
    errorMessage: "",
    email: null,
    password: null
  };
  _handleLogin = () => {
    let { email, password } = this.state;
    if (email && password) {
      this.setState({ loading: true });
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log("test");
          this.props.navigation.navigate("Map");
        })
        .catch(error => {
          console.log(error);
          this.setState({
            loading: false,
            error: true,
            errorMessage: JSON.stringify(error)
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
      <Container>
        <ScrollView>
          <Content>
            <View style={{ padding: 30, marginTop: 100 }}>
              <H1 style={{ fontFamily: "cabifycircularweb_book" }}>
                Iniciar sesión
              </H1>
            </View>
            <View style={styles.content}>
              {this.state.error ? (
                <Badge>
                  <Text>{this.state.errorMessage.Error}</Text>
                </Badge>
              ) : (
                <View />
              )}
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
                rounded
                onPress={this._handleLogin}
                style={{ padding: 20 }}
              >
                {this.state.loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text>Iniciar sesión</Text>
                )}
              </Button>
              <Button transparent onPress={() => {}}>
                <Text>Olvidé mi contraseña</Text>
              </Button>
            </View>
          </Content>
        </ScrollView>
      </Container>
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
