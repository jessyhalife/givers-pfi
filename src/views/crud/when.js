import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Input, Item, Button, H1, DatePicker, Textarea } from "native-base";
import { THEMECOLOR } from "../../const.js";
import Header from "../../components/header";
import ButtonsWizard from "../../components/buttons_wizard";
import Icon from "react-native-vector-icons/AntDesign";

export default class WhenComponent extends Component {
  render() {
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
            <Text style={{ margin: 20, fontSize: 23 }}>¿Cuándo?: </Text>
            <Text style={{ margin: 18, fontSize: 23 }}>Empieza: </Text>
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
                locale={"en"}
                modalTransparent={true}
                animationType={"slide"}
                androidMode={"default"}
                placeHolderText="dd/mm/yyyy"
              ></DatePicker>
            </Item>
            <Text style={{ margin: 18, fontSize: 23 }}>Termina: </Text>
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
                locale={"en"}
                modalTransparent={true}
                animationType={"slide"}
                androidMode={"default"}
                placeHolderText="dd/mm/yyyy"
              ></DatePicker>
            </Item>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ margin: 20, fontSize: 18 }}>Nombre del evento:</Text>
            <Item regular style={{ marginLeft: 20, marginRight: 20 }}>
              <Input />
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
              this.props.saveState(1, {});
              this.props.next();
            }}
            back={() => {
              this.props.saveState(1, {});
              this.props.prev();
            }}
          />
        </ScrollView>
      </View>
    );
  }
}
