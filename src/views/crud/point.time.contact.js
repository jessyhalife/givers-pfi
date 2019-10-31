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
import firebaseApp from "../../config/config";

export default class TimeComponent extends Component {
  state = {
    days: [
      {
        day: "L",
        active: false
      },
      {
        day: "M",
        active: false
      },
      {
        day: "X",
        active: false
      },
      {
        day: "J",
        active: false
      },
      {
        day: "V",
        active: false
      },
      {
        day: "S",
        active: false
      },
      {
        day: "D",
        active: false
      }
    ],
    timeStart: "00:00",
    timeEnd: "00:00",
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
    this.getHours();
    firebaseApp
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        this.setState({ idToken });
      });
  }
  manageDays(day) {
    console.log(day);
    var { days } = this.state;

    days = days.map(d => {
      if (d.day == day.day) {
        d.active = !d.active;
      }
      return d;
    });

    this.setState({ days });
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

  render() {
    return (
      <View>
        <ScrollView>
          <Header
            showBack={true}
            title="¿Cuándo?"
            back={() => {
              this.props.prev();
            }}
          />

          <View style={{ flexDirection: "column", marginLeft: 18 }}>
            <Text style={{ margin: 18, fontSize: 18 }}>
              ¿Qué días se puede acercar la ayuda?
            </Text>
            <View style={{ flexDirection: "row" }}>
              {this.state.days &&
                this.state.days.map(x => {
                  return (
                    <TouchableOpacity
                      key={x.day}
                      onPress={() => {
                        this.manageDays(x);
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: !x.active ? "#f3f3f3" : THEMECOLOR,
                          padding: 16,
                          borderRadius: 20,
                          margin: 5
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>{x.day}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ margin: 18, fontSize: 18 }}>Horarios:</Text>
            <View
              style={{
                flexDirection: "row",

                marginLeft: 10,
                marginRight: 20
              }}
            >
              <Item regular style={{ marginLeft: 0, marginRight: 20 }}>
                <Text style={{ margin: 18, fontSize: 18 }}>De: </Text>
                <Picker
                  mode="dropdown"
                  placeholder="00:00"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  style={{
                    width: 120,
                    fontSize: 18,
                    height: 20,
                    marginRight: 5
                  }}
                  selectedValue={this.state.timeStart}
                  onValueChange={value => {
                    this.setState({ timeStart: value });
                  }}
                >
                  {this.getHours()}
                </Picker>
              </Item>
              <Item regular style={{ marginLeft: 0, marginRight: 20 }}>
                <Text style={{ margin: 18, fontSize: 18, marginRight: 30 }}>
                  A
                </Text>
                <Picker
                  mode="dropdown"
                  placeholder="00:00"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  style={{ width: 120, fontSize: 18 }}
                  selectedValue={this.state.timeEnd}
                  onValueChange={value => {
                    this.setState({ timeEnd: value });
                  }}
                >
                  {this.getHours()}
                </Picker>
              </Item>
            </View>
          </View>
          <ButtonsWizard
            showAnterior={true}
            siguiente={() => {
              this.props.saveState(this.props.index, {
                days: this.state.days.filter(x => {
                  return x.active;
                }).day,
                timeStart: this.state.timeStart,
                timeEnd: this.state.timeEnd
              });
              console.log(
                this.state.days.filter(x => {
                  return x.active;
                })
              );
              this.props.next({
                days: this.state.days.filter(x => {
                  return x.active;
                }),
                timeStart: this.state.timeStart,
                timeEnd: this.state.timeEnd
              });
            }}
            back={() => {
              this.props.saveState(this.props.index, {
                days: this.state.days.filter(x => {
                  return x.active;
                }),
                timeStart: this.state.timeStart,
                timeEnd: this.state.timeEnd
              });
              this.props.prev({
                days: this.state.days.filter(x => {
                  return x.active;
                }),
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
