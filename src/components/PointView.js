import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { Icon, Button, Separator, ListItem, Spinner } from "native-base";
import { THEMECOLOR } from "../const.js";
export default PointView = props => {
  const { data } = props.data;
  const { needs, uid, contacts } = props;

  return (
    <ScrollView>
      <View
        style={{ flexDirection: "column", justifyContent: "space-between" }}
      >
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 60,
                  marginRight: 10,
                  backgroundColor: data.trust > 0 ? "#00d171" : "#f8f8f8",
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 5
                }}
                onPress={() => {
                  props.trust(props.data.id);
                  props.trust++;
                }}
              >
                <Icon
                  style={{
                    color: data.trust > 0 ? "white" : "gray",
                    fontSize: 15
                  }}
                  name="thumbs-up"
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
                {data.trust}
              </Text>
            </View>
            <View
              style={{ marginLeft: 10, flexDirection: "row", marginTop: 0 }}
            >
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 60,
                  marginRight: 10,
                  backgroundColor: data.untrust > 0 ? "#ff5a47" : "#f8f8f8",
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 5
                }}
                onPress={() => props.untrust(props.data.id)}
              >
                <Icon
                  style={{
                    color: data.untrust > 0 ? "white" : "gray",
                    fontSize: 15
                  }}
                  name="thumbs-down"
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
                {data.untrust}
              </Text>
            </View>
          </View>

          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 19, color: "black", fontWeight: "bold" }}>
              {data.title}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Icon style={{ fontSize: 20, color: "gray" }} name="pin"></Icon>
              <View style={{ margin: 5, alignItems: "center" }}>
                <Text style={{ fontSize: 15 }}>{data.address}</Text>
              </View>
            </View>
          </View>

          {data.description !== undefined && data.description !== "" ? (
            <View style={{ margin: 10, marginTop: 0 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {data.description}
              </Text>
            </View>
          ) : (
            undefined
          )}
          <View style={{ flexDirection: "row", margin: 10 }}>
            <Icon
              style={{ fontSize: 20, color: "gray" }}
              name="calendar"
            ></Icon>
            {data.days &&
              data.days.map(x => {
                return (
                  <Text
                    style={{
                      marginLeft: 10,
                      alignSelf: "center",
                      fontSize: 16
                    }}
                  >
                    {x}
                  </Text>
                );
              })}
          </View>
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <Icon style={{ fontSize: 20, color: "gray" }} name="time"></Icon>
            <View>
              <Text
                style={{ marginLeft: 10, alignSelf: "center", fontSize: 16 }}
              >
                De {data.open_time} a {data.close_time}
              </Text>
              <Text style={{ alignSelf: "center", fontSize: 16 }}></Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 15, marginTop: 5 }}>
            {data.contacts != undefined &&
              data.contacts.map(c => {
                if (c.address == "") return;
                return (
                  <View style={{ flexDirection: "row", margin: 10 }}>
                    <Icon
                      style={{
                        fontSize: 18,
                        color:
                          contacts.find(x => x.id == c.id) !== undefined
                            ? contacts.find(x => x.id == c.id).data.color
                            : undefined
                      }}
                      name={
                        contacts.find(x => x.id == c.id) !== undefined
                          ? contacts.find(x => x.id == c.id).data.icon
                          : undefined
                      }
                    ></Icon>
                    <Text
                      style={{
                        marginLeft: 10,
                        alignSelf: "center",
                        fontSize: 16
                      }}
                    >
                      {c.address}
                    </Text>
                  </View>
                );
              })}
          </View>
        </View>
        <Separator style={{ marginTop: 70 }} bordered></Separator>
        <View style={{ margin: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Mirá cómo podes ayudar
          </Text>
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
              {needs
                .filter(x => {
                  return data.needs ? data.needs.indexOf(x.id) >= 0 : false;
                })
                .map(x => {
                  return (
                    <View style={{ flexDirection: "row" }} key={x.id}>
                      <ListItem style={{ fontSize: 18 }}>
                        <Text>{x.data.description}</Text>
                      </ListItem>
                    </View>
                  );
                })}
            </View>
          ) : (
            undefined
          )}
        </View>
        {/* <View style={{ margin: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Ayuda recibida
          </Text>
          {renderHelp()}
        </View>  */}
      </View>
    </ScrollView>
  );
};
