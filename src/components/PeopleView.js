import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Icon, Button, Separator, ListItem } from "native-base";
import { THEMECOLOR } from "../const.js";
export default PeopleView = props => {
  const { data, ages, needs } = props;
  return (
    <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 19, color: "black" }}>
            {data.address.split(",")[0].toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 14 }}>
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
        {data.qty > 0 ? (
          <Text style={{ marginLeft: 5 }}>({data.qty})</Text>
        ) : (
          undefined
        )}
      </View>
      {needs !== undefined && needs.length > 0 ? (
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            flexWrap: "wrap",
            marginLeft: 14,
            marginBottom: 10,
            marginRight: 20
          }}
        >
          <Text>
            <Icon
              name="information-circle-outline"
              style={{ fontSize: 19, color: "gray" }}
            ></Icon>
            {"  "}
            {needs
              .filter(x => {
                return data.needs.indexOf(x.id) >= 0;
              })
              .map(x => {
                return x.data.description;
              })
              .join(", ")}
          </Text>
        </View>
      ) : (
        undefined
      )}

      <View
        style={{
          marginLeft: 20,
          marginRight: 20,
          flexDirection: "row"
        }}
      >
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 60,
              marginRight: 10,
              backgroundColor: data.seen > 0 ? "#00d171" : "#f8f8f8",
              justifyContent: "center",
              alignItems: "center",
              elevation: 5
            }}
            onPress={() => props.seen(data.id)}
          >
            <Icon
              style={{ color: data.seen > 0 ? "white" : "gray", fontSize: 15 }}
              name="eye"
            ></Icon>
          </TouchableOpacity>
          <Text
            style={{
              marginRight: 7,
              fontSize: 15,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 4,
              fontWeight: "bold"
            }}
          >
            {data.seen}
          </Text>
        </View>
        <View style={{ marginLeft: 10, flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 60,
              marginRight: 10,
              backgroundColor: data.not_seen > 0 ? "#ff5a47" : "#f8f8f8",
              justifyContent: "center",
              alignItems: "center",
              elevation: 5
            }}
            onPress={() => props.notseen(data.id)}
          >
            <Icon
              style={{
                color: data.not_seen > 0 ? "white" : "gray",
                fontSize: 15
              }}
              name="eye-off"
            ></Icon>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 15,
              marginRight: 7,
              marginTop: 4,
              fontWeight: "bold"
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
              elevation: 1
            }}
            onPress={() => props.giveHelp()}
          >
            <Text
              style={{ fontSize: 18, color: "#f8f8f8", fontWeight: "bold" }}
            >
              Ayudé
            </Text>
          </Button>
        </View>
      </View>
      <Separator style={{ marginTop: 40 }} bordered></Separator>
      <View style={{ margin: 15 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Ayuda recibida</Text>
        {!data.help ? (
          <View>
            <Image
              style={{
                height: 150,
                width: 150,
                marginTop: 10,
                resizeMode: "contain",
                alignSelf: "center"
              }}
              source={require("../assets/img/empty.png")}
            />
            <Text style={{ alignSelf: "center" }}>
              No hay ayuda registrada aún
            </Text>
          </View>
        ) : (
          <ListItem>
            <Text>Caroline Aaron</Text>
          </ListItem>
        )}
      </View>
    </View>
  );
};
