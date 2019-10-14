import React, { Component } from "react";
import Modal from "react-native-modal";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView
} from "react-native";
import { Button, Icon, Input } from "native-base";
import { THEMECOLOR } from "../const.js";
import firebaseApp from "../config/config";
export default class HelpModal extends Component {
  state = {
    needs: []
  };

  save() {
    console.log(body);
    let body = {
      needs: this.state.needs
        .filter(x => {
          return x.active;
        })
        .map(y => {
          return y.id;
        })
    };

    firebaseApp
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        fetch(
          `http://10.0.2.2:5001/givers-229af/us-central1/webApi/people/${this.props.people_id}/help`,
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
            console.log(res);
            res.json();
          })
          .then(data => console.log(data))
          .catch(error => console.log(error));
      });
  }
  componentWillReceiveProps(props) {
    let list = props.needs;
    list.forEach(x => {
      x.active = false;
    });
    this.setState({ needs: list });
  }
  componentDidMount() {}

  manageNeeds(key) {
    let prev = this.state.needs;

    let found = prev.findIndex(x => x.id == key);

    if (found >= 0) prev[found].active = !prev[found].active;

    this.setState({ needs: prev });
  }
  render() {
    return (
      <Modal isVisible={this.props.show}>
        <View style={{ elevation: 4 }}>
          <View
            style={{
              flexDirection: "column",
              backgroundColor: "white",
              padding: 20
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              ¿Cómo ayudaste?
            </Text>
            <View
              style={{
                borderColor: "#eee",
                marginTop: 15,
                marginBottom: 10,
                borderBottomWidth: 1
              }}
            />
            <ScrollView>
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
                            !item.active
                              ? { color: "#ddd" }
                              : { color: "white" }
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
            </ScrollView>
            <Button
              style={{ backgroundColor: THEMECOLOR, justifyContent: "center" }}
              onPress={() => {
                this.save();
                this.props.saveHelp();
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Guardar
              </Text>
            </Button>
          </View>
        </View>
      </Modal>
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
