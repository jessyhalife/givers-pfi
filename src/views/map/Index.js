import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapGiver from "../../components/Map";
import db from "../../db";
import firebaseApp from "../../config/config";
import { THEMECOLOR } from "../../const";
let pplRef = firebaseApp.firestore().collection("people");
let eventRef = firebaseApp.firestore().collection("events");

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { people: [], active: false, events: [] };
  }

  componentDidMount() {
    pplRef.onSnapshot(snapshots => {
      let gente = [];
      snapshots.docs.forEach(x => {
        gente.push({
          location: x.data().location,
          id: x.id,
          qty: x.data().qty,
          seen: x.data().seen,
          notSeen: x.data().not_seen,
          ages: x.data().ages,
          needs: x.data().needs
        });
      });

      this.setState({ people: gente }, () => {});
    });

    eventRef.onSnapshot(snapshots => {
      let events = [];
      snapshots.docs.forEach(x => {
        events.push({
          id: x.id,
          data: x.data()
        });
      });
      this.setState({ events: events });
    });
  }

  render() {
    return (
      <View style={styles.container} KeyboardAvoidingView={true}>
        <View style={styles.map}>
          <MapGiver
            people={this.state.people}
            navigation={this.props.navigation}
            events={this.state.events}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent"
  },
  search: {
    borderRadius: 20,
    margin: 20,
    backgroundColor: "green"
  },
  map: {
    flex: 5
  }
});
