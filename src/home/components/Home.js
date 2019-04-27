import React, { Component } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import MapGiver from "../../map/components/MapGiver";
import db from "../../db";
import ToolBar from "../ToolBar";

let pplRef = db.ref("/people/");

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { people: [] };
  }
  static navigationOptions = ({ navigation }) => ({
    headerBackTitle: null,
    headerLeft: null,
    headerTransparent: true,
    title: `givvvers`,
    headerTitleStyle: { textAlign: "center", alignSelf: "center" }
  });
  componentDidMount() {
    pplRef.on("value", snapshot => {
      this.setState({ people: Object.values(snapshot.val()) });
    });
  }
  render() {
    console.log(this.state.people);
    return (
      <View style={styles.container} KeyboardAvoidingView={true}>
        <View style={styles.map}>
          <MapGiver people={this.state.people} />
        </View>
        <ToolBar navigation={this.props.navigation}/>
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
  },
});
