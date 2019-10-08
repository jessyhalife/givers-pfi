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

export default class WhenComponent extends Component {
  state = {
    types: [],
    dateStart: new Date(),
    dateEnd: new Date(),
    timeStart: "00:00",
    timeEnd: "00:00"
  };
  componentDidMount() {
    this.getHours();
    this._fetchTypes();
  }
  _manageTypes(key) {
    const prev = this.state.types;
    prev.map(x => {
      x.active = x.id === key;
    });
    this.setState({ types: prev });
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
      "https://us-central1-givers-229af.cloudfunctions.net/webApi/events/types"
    )
      .then(response => response.json())
      .then(json => {
        let arr = json;
        arr.forEach(x => {
          x.active = false;
        });
        this.setState({ types: json }, () => {
          // if (this.props.getState().length >= 3) {
          //   if (this.props.getState()[2].hasOwnProperty("needs")) {
          //     let selected = this.props.getState()[2].needs;
          //     selected.forEach(x => {
          //       this.manageNeeds(x);
          //     });
          //   }
          // }
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
              <Input />
            </Item>
          </View>
          <View
            style={{
              margin: 10,
              flexDirection: "row",
              flexWrap: "wrap"
            }}
          >
            {this.state.types.map(x => {
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
                defaultDate={new Date()}
                minimumDate={new Date()}
                locale={"es"}
                modalTransparent={true}
                animationType={"slide"}
                androidMode={"default"}
                selectedValue={this.state.dateStart}
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
                defaultDate={new Date()}
                minimumDate={new Date()}
                locale={"es"}
                modalTransparent={true}
                animationType={"slide"}
                androidMode={"default"}
                selectedValue={this.state.dateEnd}
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
          </View>
          <View style={{ flexDirection: "column", marginBottom: 20 }}>
            <Text style={{ margin: 20, fontSize: 18 }}>Descripción:</Text>
            <Textarea
              style={{ margin: 20, height: 100, fontSize: 18 }}
              rowSpan={5}
              bordered
            />
          </View>

          <ButtonsWizard
            showAnterior={true}
            siguiente={() => {
              this.props.saveState(this.props.index, {});
              this.props.next();
            }}
            back={() => {
              this.props.saveState(this.props.index, {});
              this.props.prev();
            }}
          />
        </ScrollView>
      </View>
    );
  }
}
