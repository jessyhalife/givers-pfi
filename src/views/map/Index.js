import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import MapGiver from "../../components/Map";
import db from "../../db";
import firebaseApp from "../../config/config";
import { THEMECOLOR } from "../../const";
let pplRef = firebaseApp.firestore().collection("people");

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { people: [], active: false };
  }

  componentDidMount() {
    pplRef.onSnapshot(snapshots => {
      let gente = [];
      snapshots.docs.forEach(x => {
        gente.push({ location: x.data().location, id: x.id });
      });
      this.setState({ people: gente }, () => {});
    });
  }

  render() {
    return (
      <View style={styles.container} KeyboardAvoidingView={true}>
        <View style={styles.map}>
          <MapGiver
            people={this.state.people}
            navigation={this.props.navigation}
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