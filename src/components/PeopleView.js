import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon, Button } from "native-base";

export default PeopleView = props => {
  const { data, ages, needs } = props;
  return (
    <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ margin: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 17, color: "black" }}>
            {data.address.split(",")[0].toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <Icon
          name="contacts"
          style={{ fontSize: 17, color: "gray", marginRight: 10 }}
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
        <View style={{}}>
          <Button light style={{ padding: 1, borderRadius: 10 }}>
            <Icon style={{ color: "gray", fontSize: 15 }} name="eye"></Icon>
            <Text style={{ fontWeight: "bold", marginRight: 7, fontSize: 15 }}>
              {data.seen}
            </Text>
          </Button>
        </View>
        <View style={{ marginLeft:10 }}>
          <Button light style={{ padding: 1, borderRadius: 10 }}>
            <Icon style={{ color: "gray", fontSize: 15 }} name="eye-off"></Icon>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                marginRight: 7
              }}
            >
              {data.not_seen}
            </Text>
          </Button>
        </View>
        <View style={{marginLeft: 10}}>
          <Button  style={{ padding: 20, borderRadius: 10, borderColor: "#ffe965", backgroundColor: "#ffe965"}}>
            <Text style={{ fontSize: 18, color: "#766605", fontWeight: "bold" }}>
              yo ayudé
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
