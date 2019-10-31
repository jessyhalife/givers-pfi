import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Input, Icon, Card, CardItem } from "native-base";
import { THEMECOLOR } from "../../const.js";
import Header from "../../components/header";
import ButtonsWizard from "../../components/buttons_wizard";
import firebaseApp from "../../config/config";

export default class ContactComponent extends Component {
  state = {
    types: [],
    contacts: [],
    selected: "",
    data: "",
    idToken: ""
  };
  componentDidMount() {
    // if (this.props.getState().length >= this.props.index + 1) {
    //   var {
    //     title,
    //     description,
    //     type,
    //     days,
    //     timeStart,
    //     timeEnd
    //   } = this.props.getState()[this.props.index];
    //   this.setState(
    //     {
    //       title,
    //       description,
    //       dateStart: new Date(dateStart),
    //       dateEnd: new Date(dateEnd),
    //       timeStart,
    //       timeEnd
    //     },
    //     () => {}
    //   );
    // }

    firebaseApp
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        this.setState({ idToken });
        this._fetchTypes();
        // this._manageTypes(type);
      });
  }
  _fetchTypes() {
    fetch(
      "https://us-central1-givers-229af.cloudfunctions.net/webApi/points/contacts",
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: this.state.idToken
        })
      }
    )
      .then(response => response.json())
      .then(json => {
        let arr = json;
        arr.forEach(x => {
          x.data.address = "";
        });

        this.setState({ contacts: arr }, () => {
          // if (this.props.getState().length >= this.props.index + 1) {
          //   let t = this.props.getState()[this.props.index].type;
          //   if (t) this._manageTypes(t);
          // }
        });
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <View>
        <ScrollView>
          <Header
            showBack={true}
            title="Contacto"
            back={() => {
              this.props.prev();
            }}
          />

          <View
            style={{ flexDirection: "column", margin: 10, marginBottom: 40 }}
          >
            {this.state.contacts.map(c => {
              return (
                <Card>
                  <CardItem style={{ alignItems: "center" }} key={c.id}>
                    <View
                      style={{ alignItems: "center", flexDirection: "row" }}
                    >
                      <Icon
                        style={{
                          fontSize: 20,
                          color: c.data.color ? c.data.color : undefined
                        }}
                        name={c.data.icon}
                      ></Icon>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          alignSelf: "center",
                          marginLeft: 5
                        }}
                      >
                        {c.data.description}
                      </Text>

                      <Input
                        style={{
                          marginLeft: 15,
                          borderColor: "#eee",
                          borderWidth: 1
                        }}
                        regular
                      ></Input>
                    </View>
                  </CardItem>
                </Card>
              );
            })}
          </View>
          <ButtonsWizard
            showAnterior={true}
            siguiente={() => {
              this.props.saveState(this.props.index, {
                contacts: this.state.contacts.map(x => {
                  return { id: x.id, address: x.data.address };
                })
              });

              this.props.next({
                contacts: this.state.contacts.map(x => {
                  return { id: x.id, address: x.data.address };
                })
              });
            }}
            back={() => {
              this.props.saveState(this.props.index, {
                contacts: this.state.contacts.map(x => {
                  return { id: x.id, address: x.data.address };
                })
              });
              this.props.prev({
                contacts: this.state.contacts.map(x => {
                  return { id: x.id, address: x.data.address };
                })
              });
            }}
          />
        </ScrollView>
      </View>
    );
  }
}
