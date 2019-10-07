import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon, Button } from "native-base";
import { THEMECOLOR } from "../const.js";
export default PeopleView = props => {
  const { data, ages, needs } = props;
  return (
    <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ margin: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 19, color: "black" }}>
            {data.address.split(",")[0].toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <Icon
          name="contacts"
          style={{ fontSize: 19, color: "gray", marginRight: 10 }}
        ></Icon>
        <Text style={{}}>
          {ages
            .filter(x => {
              return data.ages.indexOf(x.id) >= 0;
            })
            .map(x => {
              return x.data.tipo.toLowerCase();
            })
            .join(" | ")}
        </Text>
      </View>
      <View
        style={{
          margin: 20,
          flexDirection: "row"
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 60,
              marginRight: 10,
              backgroundColor: "#f8f8f8",
              justifyContent: "center",
              alignItems: "center",
              elevation: 5
            }}
            onPress={() => props.seen(data.id)}
          >
            <Icon style={{ color: "gray", fontSize: 15 }} name="eye"></Icon>
          </TouchableOpacity>
          <Text
            style={{
              marginRight: 7,
              fontSize: 15,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 4
            }}
          >
            {data.seen}
          </Text>
        </View>
        <View style={{ marginLeft: 10, flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 60,
              marginRight: 10,
              backgroundColor: "#f8f8f8",
              justifyContent: "center",
              alignItems: "center",
              elevation: 5
            }}
            onPress={() => props.notseen(data.id)}
          >
            <Icon style={{ color: "gray", fontSize: 15 }} name="eye-off"></Icon>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 15,
              marginRight: 7,
              marginTop: 4
            }}
          >
            {data.not_seen}
          </Text>
        </View>
        <View style={{ right: 0, position: "absolute" }}>
          <Button
            style={{
              padding: 20,
              borderRadius: 10,
              backgroundColor: THEMECOLOR,
              elevation: 5
            }}
          >
            <Text style={{ fontSize: 18, color: "f8f8f8", fontWeight: "bold" }}>
              Ayudé
            </Text>
          </Button>
        </View>
      </View>
      {/* <View style={{ flexDirection: "row", marginLeft: 10 }}>
          {needs
            .filter(x => {
              return data.needs.indexOf(x.id) >= 0;
            })
            .map(x => {
              return (
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    style={{ margin: 5, color: "black", fontSize: 18 }}
                    name={x.data.icon}
                  ></Icon>
                  <Text style={{fontSize: 18}}>{x.data.description}</Text>
                </View>
              );
            })}
        </View> */}
    </View>
  );
};
