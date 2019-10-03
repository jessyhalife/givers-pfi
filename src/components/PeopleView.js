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
            {data.address.split(",")[0]}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button light style={{ padding: 1 }}>
            <Icon style={{ color: "gray", fontSize: 18 }} name="eye"></Icon>
            <Text style={{ fontWeight: "bold", marginRight: 5 }}>{data.seen}</Text>
          </Button>
        </View>
        <View style={{ flexDirection: "row", marginLeft: 7}}>
          <Button light style={{ padding: 1 }}>
            <Icon style={{ color: "gray", fontSize: 18 }} name="eye-off"></Icon>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15
              }}
            >
              {data.not_seen}
            </Text>
          </Button>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <Icon
          name="contacts"
          style={{ fontSize: 17, color: "gray", marginRight: 10 }}
        ></Icon>
        <Text>
          {ages
            .filter(x => {
              return data.ages.indexOf(x.id) >= 0;
            })
            .map(x => {
              return x.data.tipo;
            })
            .join(" | ")}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end" , margin: 20}}>
        <Button warning style={{ width: "30%", padding: 10 }}>
          <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>
            Ayudé!
          </Text>
          <Icon name="hand" style={{ color: "black" }}></Icon>
        </Button>
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
