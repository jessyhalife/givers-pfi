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

import UserAvatar from "react-native-user-avatar";

export default EventView = props => {
  const { data } = props.data;
  const { needs } = props;
  const { uid } = props;
  getAttendees = () => {
    if (data.attendees.length < 4) {
      return data.attendees.map(x => {
        return (
          <UserAvatar
            size="24"
            name={String.fromCharCode(65 + Math.floor(Math.random() * 26))}
          ></UserAvatar>
        );
      });
    } else {
      var avatars = [];
      for (i = 0; i < 4; i++) {
        avatars.push(
          <UserAvatar
            size="24"
            name={String.fromCharCode(65 + Math.floor(Math.random() * 26))}
          ></UserAvatar>
        );
      }
      avatars.push(
        <UserAvatar
          size="24"
          color="#dedede"
          name={`${(data.attendees.length - 4).toString()}`}
        ></UserAvatar>
      );
      return avatars;
    }
  };
  renderHelp = () => {
    if (data.loadingHelp) {
      return <Spinner color={THEMECOLOR}></Spinner>;
    }

    // if (data.help && data.help.length > 0) {
    //   var help = data.help;

    //   return help.map(x => {
    //     return (
    //       <ListItem key={x.id}>
    //         <View style={{ flexDirection: "row" }}>
    //           <View style={{ marginRight: 15 }}>
    //             <Text style={{ fontSize: 14, fontWeight: "bold" }}>
    //               {new Date(x.data.date._seconds * 1000).toLocaleString(
    //                 "es-ES"
    //               )}
    //             </Text>
    //           </View>
    //           <View>
    //             {x.data.help.map(y => {
    //               return (
    //                 <Text>
    //                   {
    //                     needs.find(z => {
    //                       return z.id == y.id;
    //                     }).data.description
    //                   }
    //                 </Text>
    //               );
    //             })}
    //           </View>
    //         </View>
    //       </ListItem>
    //     );
    //   });
    // } else {
    //   return (
    //     <View>
    //       <Image
    //         style={{
    //           height: 150,
    //           width: 150,
    //           marginTop: 10,
    //           resizeMode: "contain",
    //           alignSelf: "center"
    //         }}
    //         source={require("../assets/img/empty.png")}
    //       />
    //       <Text style={{ alignSelf: "center" }}>
    //         No hay ayuda registrada aún
    //       </Text>
    //     </View>
    //   );
    // }
  };
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
                Comienza: {new Date(data.startDate).toLocaleDateString("es-ES")}{" "}
                {data.startTime}
              </Text>
              <Text style={{ alignSelf: "center", fontSize: 16 }}>
                Finaliza: {new Date(data.endDate).toLocaleDateString("es-ES")}{" "}
                {data.endTime}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", margin: 15, marginTop: 5 }}>
            <Icon style={{ fontSize: 20 }} name="pin"></Icon>
            <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 16 }}>
              {props.data.address}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            flexDirection: "row"
          }}
        >
          {data.attendees.length > 0 ? (
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: 10
              }}
            >
              <Text style={{ marginRight: 10, alignSelf: "center" }}>
                Ya participan:
              </Text>
              <View style={{ flexDirection: "row" }}>{getAttendees()}</View>
            </View>
          ) : (
            undefined
          )}
          <View style={{ right: 0, position: "absolute" }}>
            <Button
              style={{
                paddingRight: 20,
                borderRadius: 10,
                backgroundColor: "#0083ff",
                elevation: 1
              }}
              onPress={() => {
                props.asistire(props.data.id);
              }}
            >
              {data.attendees.indexOf(uid) > -1 ? (
                <View style={{ flexDirection: "row" }}>
                  <Icon name="checkmark" style={{ fontSize: 20 }}></Icon>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#f8f8f8",
                      fontWeight: "bold"
                    }}
                  >
                    Asistirás
                  </Text>
                </View>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <Icon name="walk" style={{ fontSize: 20 }}></Icon>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#f8f8f8",
                      fontWeight: "bold"
                    }}
                  >
                    Asistiré
                  </Text>
                </View>
              )}
            </Button>
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
