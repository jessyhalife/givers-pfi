import React, { Component } from "react";
import { Image, View, StyleSheet } from "react-native";
import { Container, Button, Body, Text, Content, H1 } from "native-base";

export default class Main extends Component {
  _navigateLogin = () => {
    this.props.navigation.navigation("Login");
  };
  render() {
    return (
      <Container>
        <Content padder>
          <View style={styles.header}>
            <Image
              style={{ height: 100, width: null, flex: 1, marginTop: 100 }}
              source={require("../assets/img/givers.jpeg")}
            />
          </View>
          <View style={styles.content}>
            <H1 style={{ fontFamily: "cabifycircularweb_book" }}>
              Ayudandote a ayudar!
            </H1>
            <Text style={{ fontFamily: "cabifycircularweb_light" }}>
              Phasellus ac augue sed tellus malesuada maximus at mollis nisl.
              Proin rutrum ipsum vitae Phasellus ac augue sed tellus malesuada
              maximus at mollis nisl. Dui euismod pretium. Nunc sed eros nec
              ligula ultrices pulvinar. Vestibulum tristique erat quis augue.
            </Text>
          </View>
          <View style={styles.buttons}>
            <Button
              rounded
              onPress={() => {
                this.props.navigation.navigate("Register");
              }}
            >
              <Text style={{ fontFamily: "cabifycircularweb_book" }}>
                Crear nueva cuenta
              </Text>
            </Button>
            <Button
              rounded
              transparent
              onPress={() => {
                this.props.navigation.navigate("Login");
              }}
            >
              <Text style={{ fontFamily: "cabifycircularweb_book" }}>
                Iniciar sesión
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    paddingBottom: 40
  },
  content: {
    marginTop: 30,
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30,
    fontFamily: "cabifycircularweb_book"
  },
  buttons: {
    alignItems: "center",
    marginTop: 30,
    fontFamily: "cabifycircularweb_book"
  }
});
