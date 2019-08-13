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
  H1,
  Footer,
  Text,
  Content,
  Button,
  CheckBox,
  ListItem,
  Body
} from "native-base";
export default class Register extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerBackTitle: null,
    headerLeft: null,
    headerTransparent: true
  });
  state = {
    error: false,
    email: null,
    username: null,
    password: null,
    rePassword: null,
    formOK: false,
    loading: false,
    terms: false
  };

  _handleRegister = () => {
    this.setState({ loading: true });
    let { email, password } = this.state;
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.setState({ error: false, loading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true, loading: false });
      });
  };

  componentWillUnmount() {
    console.log(this.state.formOK);
  }
  render() {
    return (
      <Container>
        <ScrollView>
          <Content>
            <View style={{ padding: 30 }}>
              <H1>Nueva cuenta</H1>
            </View>
            <View style={styles.content}>
              <Form>
                <Item>
                  <Label>Nombre de usuario</Label>
                  <Input
                    onChange={e => {
                      this.setState({ username: e.nativeEvent.text });
                    }}
                    placeholder="janeDoe"
                    placeholderTextColor="#ddd"
                  />
                </Item>
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
                rounded
                danger
                onPress={this._handleRegister}
                style={{ padding: 20 }}
              >
                {this.state.loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text>Crear cuenta</Text>
                )}
              </Button>
              <Button enable={this.state.terms} transparent onPress={() => {this.props.navigation.navigate('Login')}}>
                <Text>Iniciar sesión</Text>
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
