import React, { Component } from "react";
import Modal from "react-native-modal";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  TextInput
} from "react-native";
import { Button, Icon, Textarea, Root } from "native-base";
import { THEMECOLOR } from "../const.js";
import firebaseApp from "../config/config";
import Header from "./header";
export default class HelpModal extends Component {
  state = {
    needs: [],
    comments: ""
  };

  save() {
    let body = {
      needs: this.state.needs
        .filter(x => {
          return x.active;
        })
        .map(x => {
          return { id: x.id };
        }),
      comments: this.state.comments
    };

    firebaseApp
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        fetch(
          `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/${this.props.navigation.state.params.people_id}/help`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: idToken
            })
          }
        )
          .then(res => {
            res.json();
          })
          .then(data => console.log(data))
          .catch(error => console.log(error));
      });
  }
  componentWillReceiveProps(props) {}
  componentDidMount() {
    let list = this.props.navigation.state.params.needs;
    list.forEach(x => {
      x.active = false;
    });
    this.setState({ needs: list });
  }

  manageNeeds(key) {
    let prev = this.state.needs;

    let found = prev.findIndex(x => x.id == key);

    if (found >= 0) prev[found].active = !prev[found].active;

    this.setState({ needs: prev });
  }
  render() {
    return (
      //   <Modal isVisible={this.props.show}>
      <Root>
        <Header showBack={false} title="Registrar ayuda"></Header>
        <ScrollView>
          <Text style={{ fontSize: 20, fontWeight: "bold", margin: 30 }}>
            Cómo ayudaste?
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "stretch",
              justifyContent: "center"
            }}
          >
            <FlatList
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center"
              }}
              data={this.state.needs}
              keyExtractor={item => item.id}
              numColumns={3}
              renderItem={({ item }) => (
                <View style={{ margin: 3, alignItems: "center" }}>
                  <TouchableOpacity
                    style={
                      !item.active
                        ? styles.tiles
                        : { ...styles.tiles, ...styles.selectedTile }
                    }
                    onPress={() => {
                      this.manageNeeds(item.id);
                    }}
                  >
                    <Icon
                      name={item.data.icon}
                      style={
                        !item.active ? { color: "#ddd" } : { color: "white" }
                      }
                    ></Icon>
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginTop: 10,
                      marginBottom: 15,
                      width: 100,
                      textAlign: "center"
                    }}
                  >
                    {item.data.description}
                  </Text>
                </View>
              )}
            ></FlatList>
          </View>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 20,
              marginLeft: 30
            }}
          >
            ¿Algún comentario?
          </Text>
          <TextInput
            value={this.state.comments}
            onChange={ev => this.setState({ comments: ev.nativeEvent.value })}
            multiline={true}
            style={{
              height: 100,
              borderColor: "#eee",
              borderWidth: 1,
              margin: 20
            }}
          ></TextInput>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <Button
              bordered
              light
              onPress={() => this.props.navigation.goBack()}
              style={{ width: "50%", justifyContent: "center" }}
            >
              <Text>Cancelar</Text>
            </Button>
            <Button
              style={{
                backgroundColor: THEMECOLOR,
                justifyContent: "center",
                width: "50%"
              }}
              onPress={() => {
                this.save();
                this.props.navigation.goBack();
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Guardar
              </Text>
            </Button>
          </View>
        </ScrollView>
      </Root>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    color: "gray"
  },
  selectedTile: {
    elevation: 0,
    backgroundColor: THEMECOLOR
  },
  tiles: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "#f8f8f8",
    borderRadius: 50,
    elevation: 2
  }
});
