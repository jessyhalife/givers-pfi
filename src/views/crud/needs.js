import React, { Component } from "react";
import { Text, Button, H1 } from "native-base";
import {
  TouchableHighlight,
  View,
  CheckBox,
  StyleSheet,
  ScrollView
} from "react-native";
import { THEMECOLOR } from "../../const.js";
class NeedsComponent extends Component {
  state = {
    needs: [],
    selectedNeeds: [],
    loading: true
  };

  componentDidMount() {
    this._fetchNeeds();
  }

  _fetchNeeds() {
    fetch(
      "https://us-central1-givers-229af.cloudfunctions.net/webApi/helptypes"
    )
      .then(response => response.json())
      .then(json => {
        let arr = json;
        arr.forEach(x => {
          x.active = false;
        });
        this.setState({ needs: json, loading: false });
      });
  }

  manageNeeds(key) {
    let prev = this.state.needs;
    console.log(key);
    let found = prev.findIndex(x => x.id == key);
    console.log(found);
    if (found >= 0) prev[found].active = !prev[found].active;
    console.log(prev);
    this.setState({ needs: prev });
  }
  render() {
    return (
      <View>
        <ScrollView style={{ flex: 5 }}>
          <View style={{ marginTop: 20, marginLeft: 20, marginBottom: 20 }}>
            <H1 style={{ fontWeight: "bold" }}>
              ¿Sabés si necesita/n algo en particular?
            </H1>
          </View>
          {this.state.needs.map(element => {
            return (
              <TouchableHighlight style={{ marginLeft: 10, marginTop: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 3
                  }}
                >
                  <CheckBox
                    checked={false}
                    onChange={() => this.manageNeeds(element.id)}
                    key={element.id}
                  ></CheckBox>
                  <Text style={{ marginLeft: 3 }}>
                    {element.data.description}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </ScrollView>
        <View style={{ flex: 3 }}>
          <Button
            bordered
            light
            style={styles.button}
            onPress={() => {
              console.log(this.state.needs);
              this.props.prev({
                needs: this.state.needs.filter(x => x.active)
              });
            }}
          >
            <Text
              style={{
                color: THEMECOLOR,
                alignItems: "center",
                fontWeight: "bold"
              }}
            >
              VOLVER
            </Text>
          </Button>
        </View>
        <View>
          <Button
            style={{ ...styles.button, backgroundColor: THEMECOLOR }}
            onPress={() => {
              this.props.next({
                needs: this.state.needs.filter(x => x.active)
              });
            }}
          >
            <Text
              style={{
                color: "white",
                alignItems: "center",
                fontWeight: "bold"
              }}
            >
              SIGUIENTE
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  tiles: {
    borderColor: "rgba(0,0,0,0.2)",
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#fff",
    width: 150,
    height: 200,
    shadowColor: "#eee",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
    margin: 20
  },
  labels: {
    fontSize: 20,
    fontWeight: "bold"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 60
  }
});
export default NeedsComponent;
