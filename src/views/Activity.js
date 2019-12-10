import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  TouchableHighlight,
  ScrollView
} from "react-native";
import {
  Container,
  Header,
  Tab,
  Tabs,
  ScrollableTab,
  List,
  ListItem,
  Badge
} from "native-base";
import SectionList from "react-native-tabs-section-list";
import firebaseApp from "../config/config";
import { THEMECOLOR, THEMECOLORLIGHT } from "../const.js";

let pplRef = firebaseApp.firestore().collection("people");
let eventRef = firebaseApp.firestore().collection("events");
let pointRef = firebaseApp.firestore().collection("points");

export default class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = [
      {
        people: [],
        events: [],
        points: [],
        loading: true
      }
    ];
  }

  componentDidMount() {
    console.log("this is happening");
    var uid = firebaseApp.auth().currentUser.uid;

    pplRef.onSnapshot(snapshots => {
      let gente = [];
      snapshots.docs.forEach(x => {
        if (x.data().user_id == uid) {
          gente.push({
            id: x.id,
            data: x.data()
          });
        }
      });
      this.setState({ people: gente }, () => {});
    });

    eventRef.onSnapshot(snapshots => {
      let events = [];
      snapshots.docs.forEach(x => {
        if (x.data().attendees.filter(x => x == uid).length > 0) {
          events.push({
            id: x.id,
            data: x.data()
          });
        }
      });
      this.setState({ events: events });
    });

    pointRef.onSnapshot(snapshots => {
      let points = [];
      snapshots.docs.forEach(x => {
        if (x.data().user_id == uid) {
          points.push({
            id: x.id,
            data: x.data()
          });
        }
      });
      this.setState({ points: points });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Container>
          <Header style={{ backgroundColor: THEMECOLOR }}>
            <StatusBar backgroundColor={THEMECOLOR}></StatusBar>
            <Text
              style={{
                marginTop: 20,
                fontSize: 18,
                fontWeight: "bold",
                color: "white"
              }}
            >
              Tu actividad
            </Text>
          </Header>
          <Tabs
            renderTabBar={() => (
              <ScrollableTab style={{ backgroundColor: THEMECOLOR }} />
            )}
          >
            <Tab
              heading="Personas"
              tabStyle={{ backgroundColor: THEMECOLOR }}
              textStyle={{ color: "#fff" }}
              activeTabStyle={{ backgroundColor: THEMECOLORLIGHT }}
            >
              {this.state.people ? (
                <ScrollView>
                  <List>
                    {this.state.people
                      .sort(function(x, y) {
                        // true values first
                        return x.data.active === y.data.active
                          ? 0
                          : x.data.active
                          ? -1
                          : 1;
                      })
                      .map(x => {
                        return (
                          <ListItem>
                            <View>
                              <Badge
                                style={{
                                  backgroundColor: x.data.active
                                    ? "#5cb85c"
                                    : "gray",
                                  marginBottom: 10,
                                  alignItems: "center",
                                  flexDirection: "row"
                                }}
                              >
                                <Text
                                  style={{
                                    color: "white",
                                    alignSelf: "center"
                                  }}
                                >
                                  {x.data.active ? "Activo" : "Inactivo"}
                                </Text>
                              </Badge>
                              <Text
                                style={{
                                  alignItems: "flex-end",
                                  fontSize: 15,
                                  fontWeight: "bold"
                                }}
                              >
                                {x.data.address}
                              </Text>
                              <Text>
                                Creado el:{" "}
                                <Text style={{ fontWeight: "bold" }}>
                                  {new Date(x.data.created_at).toDateString()}
                                </Text>
                              </Text>
                              <Text>
                                Visto/s por última vez:{" "}
                                <Text style={{ fontWeight: "bold" }}>
                                  {new Date(x.data.last_seen).toDateString()}
                                </Text>
                              </Text>
                            </View>
                          </ListItem>
                        );
                      })}
                  </List>
                </ScrollView>
              ) : (
                <View>
                  <Text>No registraste ninguna persona aún</Text>
                </View>
              )}
            </Tab>
            <Tab
              heading="Puntos de ayuda"
              tabStyle={{ backgroundColor: THEMECOLOR }}
              textStyle={{ color: "#fff" }}
              activeTabStyle={{ backgroundColor: THEMECOLORLIGHT }}
            >
              {this.state.points ? (
                <List>
                  {this.state.people.map(x => {
                    return (
                      <ListItem>
                        <View>
                          <Text>{typeof x}</Text>
                        </View>
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                undefined
              )}
            </Tab>
            <Tab
              heading="Eventos"
              tabStyle={{ backgroundColor: THEMECOLOR }}
              textStyle={{ color: "#fff" }}
              activeTabStyle={{ backgroundColor: THEMECOLORLIGHT }}
            >
              {this.state.events ? (
                <ScrollView>
                  <List>
                    <ListItem itemDivider>
                      <Text>Eventos próximos</Text>
                    </ListItem>
                    {this.state.events
                      .sort((a, b) => {
                        return (
                          new Date(a.data.startDate) -
                          new Date(b.data.startDate)
                        );
                      })
                      .filter(x => {
                        return new Date() < new Date(x.data.startDate);
                      })
                      .map(x => {
                        return (
                          <ListItem>
                            <View>
                              <Text
                                style={{
                                  alignItems: "flex-end",
                                  fontSize: 15,
                                  fontWeight: "bold"
                                }}
                              >
                                {x.data.title}
                              </Text>
                              <Text>{x.data.address}</Text>
                              <Text style={{ fontSize: 15, marginTop: 10 }}>
                                {new Date(x.data.startDate).toLocaleDateString(
                                  "es-ES"
                                )}{" "}
                                {x.data.startTime} {" - "}{" "}
                                {new Date(x.data.endDate).toLocaleDateString(
                                  "es-ES"
                                )}{" "}
                                {x.data.endTime}
                              </Text>
                            </View>
                          </ListItem>
                        );
                      })}
                    <ListItem itemDivider>
                      <Text>Eventos pasados</Text>
                    </ListItem>
                    {this.state.events
                      .sort((a, b) => {
                        return (
                          new Date(a.data.startDate) -
                          new Date(b.data.startDate)
                        );
                      })
                      .filter(x => {
                        return (
                          new Date() > new Date(x.data.startDate) &&
                          new Date() > new Date(x.data.endDate)
                        );
                      })
                      .map(x => {
                        return (
                          <ListItem>
                            <View>
                              <Text
                                style={{
                                  alignItems: "flex-end",
                                  fontSize: 15,
                                  fontWeight: "bold"
                                }}
                              >
                                {x.data.title}
                              </Text>
                              <Text>{x.data.address}</Text>
                              <Text style={{ fontSize: 15, marginTop: 10 }}>
                                {new Date(x.data.startDate).toLocaleDateString(
                                  "es-ES"
                                )}{" "}
                                {x.data.startTime} {" - "}{" "}
                                {new Date(x.data.endDate).toLocaleDateString(
                                  "es-ES"
                                )}{" "}
                                {x.data.endTime}
                              </Text>
                            </View>
                          </ListItem>
                        );
                      })}
                  </List>
                </ScrollView>
              ) : (
                <View>
                  <Text>No registraste ninguna persona aún</Text>
                </View>
              )}
            </Tab>
          </Tabs>
        </Container>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEMECOLOR
  }
});
