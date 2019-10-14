import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Input, Item, Badge, DatePicker, Textarea, Picker } from "native-base";
import { THEMECOLOR } from "../../const.js";
import Header from "../../components/header";
import ButtonsWizard from "../../components/buttons_wizard";
import Icon from "react-native-vector-icons/AntDesign";
import firebaseApp from "../../config/config";

export default class WhenComponent extends Component {
  state = {
    title: "",
    description: "",
    types: [],
    dateStart: "",
    dateEnd: "",
    timeStart: "00:00",
    timeEnd: "00:00",
    idToken: ""
  };
  componentDidMount() {
    if (this.props.getState().length >= this.props.index + 1) {
      var {
        title,
        description,
        type,
        dateStart,
        dateEnd,
        timeStart,
        timeEnd
      } = this.props.getState()[this.props.index];
      this.setState(
        {
          title,
          description,
          dateStart: new Date(dateStart),
          dateEnd: new Date(dateEnd),
          timeStart,
          timeEnd
        },
        () => {
          alert(this.state.dateStart);
          alert(this.state.dateEnd);
        }
      );
    }
    this.getHours();
    firebaseApp
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        this.setState({ idToken });
        this._fetchTypes();
        this._manageTypes(type);
      });
  }
  _manageTypes(key) {
    const prev = this.state.types;
    prev.map(x => {
      x.active = x.id === key;
    });
    this.setState({ types: prev }, () => {
      if (!this.state.title || this.state.title == "") {
        var name = prev.find(x => {
          return x.id === key;
        });

        if (name !== undefined) {
          this.setState({
            title: name.data.description
          });
        }
      }
    });
  }

  getHours() {
    let hours = [];
    for (i = 0; i < 24; i++) {
      for (j = 0; j < 59; j = j + 15) {
        hours.push(
          <Picker.Item
            key={`${("0" + i).slice(-2).toString()}:${("0" + j)
              .slice(-2)
              .toString()}`}
            label={`${("0" + i).slice(-2).toString()}:${("0" + j)
              .slice(-2)
              .toString()}`}
            value={`${("0" + i).slice(-2).toString()}:${("0" + j)
              .slice(-2)
              .toString()}`}
          />
        );
      }
    }
    return hours;
  }

  _fetchTypes() {
    fetch(
      "https://us-central1-givers-229af.cloudfunctions.net/webApi/events/types",
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
          x.active = false;
        });
        this.setState({ types: arr }, () => {
          if (this.props.getState().length >= this.props.index + 1) {
            let t = this.props.getState()[this.props.index].type;
            if (t) this._manageTypes(t);
          }
        });
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    const { types } = this.state;
    return (
      <View>
        <ScrollView>
          <Header
            showBack={true}
            title="Nuevo evento"
            back={() => {
              this.props.prev();
            }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ margin: 20, fontSize: 18 }}>Nombre del evento:</Text>
            <Item regular style={{ marginLeft: 20, marginRight: 20 }}>
              <Input
                value={this.state.title}
                onChange={e => this.setState({ title: e.nativeEvent.text })}
              />
            </Item>
          </View>
          <View
            style={{
              margin: 10,
              flexDirection: "row",
              flexWrap: "wrap"
            }}
          >
            {types.map(x => {
              return (
                <TouchableOpacity
                  style={{ margin: 3 }}
                  key={x.id}
                  onPress={() => {
                    this._manageTypes(x.id);
                  }}
                >
                  <View
                    style={{
                      backgroundColor: !x.active ? "#f3f3f3" : THEMECOLOR,
                      padding: 6,
                      borderRadius: 20,
                      margin: 5
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: !x.active ? undefined : "white"
                      }}
                    >
                      {x.data.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ margin: 18, fontSize: 18 }}>Empieza: </Text>
            <Item regular style={{ marginLeft: 20, marginRight: 20 }}>
              <Icon
                name="calendar"
                color={THEMECOLOR}
                size={20}
                style={{ marginLeft: 10 }}
              ></Icon>
              <DatePicker
                defaultDate={this.state.dateStart}
                minimumDate={new Date()}
                locale={"es"}
                modalTransparent={true}
                animationType={"slide"}
                androidMode={"default"}
                selectedValue={this.state.dateStart}
                onDateChange={value => {
                  this.setState({ dateStart: value });
                }}
              ></DatePicker>
              <Picker
                mode="dropdown"
                placeholder="00:00"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                style={{ width: undefined, fontSize: 18 }}
                selectedValue={this.state.timeStart}
                onValueChange={value => {
                  this.setState({ timeStart: value });
                }}
              >
                {this.getHours()}
              </Picker>
            </Item>
            <Text style={{ margin: 18, fontSize: 18 }}>Termina: </Text>
            <Item regular style={{ marginLeft: 20, marginRight: 20 }}>
              <Icon
                name="calendar"
                color={THEMECOLOR}
                size={20}
                style={{ marginLeft: 10 }}
              ></Icon>
              <DatePicker
                defaultDate={this.state.dateEnd}
                minimumDate={new Date()}
                locale={"es"}
                modalTransparent={true}
                animationType={"slide"}
                androidMode={"default"}
                selectedValue={this.state.dateEnd}
                onDateChange={value => {
                  this.setState({ dateEnd: value });
                }}
              ></DatePicker>
              <Picker
                mode="dropdown"
                placeholder="00:00"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                style={{ width: undefined, fontSize: 18 }}
                selectedValue={this.state.timeEnd}
                onValueChange={value => {
                  this.setState({ timeEnd: value });
                }}
              >
                {this.getHours()}
              </Picker>
            </Item>
            {/* {this.state.dateStart > this.state.dateEnd ? (
              <Text>
                La fecha de fin debe ser mayor o igual a la fecha de inicio
              </Text>
            ) : (
              undefined
            )} */}
          </View>
          <View style={{ flexDirection: "column", marginBottom: 20 }}>
            <Text style={{ margin: 20, fontSize: 18 }}>Descripción:</Text>
            <Textarea
              style={{ margin: 20, height: 100, fontSize: 18 }}
              rowSpan={5}
              bordered
              value={this.state.description}
              onChange={e => this.setState({ description: e.nativeEvent.text })}
            />
          </View>

          <ButtonsWizard
            showAnterior={true}
            siguiente={() => {
              this.props.saveState(this.props.index, {
                title: this.state.title,
                description: this.state.description,
                type: this.state.types.find(x => {
                  return x.active;
                }).id,
                dateStart: this.state.dateStart,
                dateEnd: this.state.dateEnd,
                timeStart: this.state.timeStart,
                timeEnd: this.state.timeEnd
              });
              this.props.next({
                title: this.state.title,
                description: this.state.description,
                type: this.state.types.find(x => {
                  return x.active;
                }).id,
                dateStart: this.state.dateStart,
                dateEnd: this.state.dateEnd,
                timeStart: this.state.timeStart,
                timeEnd: this.state.timeEnd
              });
            }}
            back={() => {
              this.props.saveState(this.props.index, {
                title: this.state.title,
                description: this.state.description,
                type: this.state.types
                  .find(x => {
                    return x.active;
                  })
                  .map(y => {
                    return y.id;
                  }),
                dateStart: this.state.dateStart,
                dateEnd: this.state.dateEnd,
                timeStart: this.state.timeStart,
                timeEnd: this.state.timeEnd
              });
              this.props.prev({
                title: this.state.title,
                description: this.state.description,
                type: this.state.types
                  .find(x => {
                    return x.active;
                  })
                  .map(y => {
                    return y.id;
                  }),
                dateStart: this.state.dateStart,
                dateEnd: this.state.dateEnd,
                timeStart: this.state.timeStart,
                timeEnd: this.state.timeEnd
              });
            }}
          />
        </ScrollView>
      </View>
    );
  }
}
