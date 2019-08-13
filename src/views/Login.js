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
  Footer,
  Text,
  Content,
  Button
} from "native-base";

export default class Main extends Component {
  state = {
    loading: false,
    error: false,
    email: null,
    password: null
  };
  _handleLogin = () => {
    let { email, password } = this.state;
    console.log(email, password);
    this.setState({ loading: true });
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("test");
        this.props.navigation.navigate("Home");
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };
  render() {
    return (
      <Container>
        <ScrollView>
          <Content>
            <View style={{ padding: 30 }}>
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
                rounded
                danger
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
