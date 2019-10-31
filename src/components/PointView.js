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
          <View style={{ margin: 10 }}>
            <Text style={{ fontSize: 19, color: "black" }}>{data.title}</Text>
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
            <Icon style={{ fontSize: 20 }} name="time"></Icon>
            <View>
              <Text
                style={{ marginLeft: 10, alignSelf: "center", fontSize: 16 }}
              >
                De: {data.startTime}
              </Text>
              <Text style={{ alignSelf: "center", fontSize: 16 }}>
                A:
                {data.endTime}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", margin: 15, marginTop: 5 }}>
            <Icon style={{ fontSize: 20 }} name="pin"></Icon>
            <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 16 }}>
              Contactos!
            </Text>
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
