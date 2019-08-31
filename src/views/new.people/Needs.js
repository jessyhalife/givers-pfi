import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Form,
  Item,
  Input,
  Label,
  Text,
  Content,
  Button,
  Icon
} from "native-base";
class Needs extends Component {
  state = {
    needs: [],
    selectedNeeds: []
  };

  componentDidMount() {
    this._fetchNeeds();
  }

  _fetchNeeds() {
    fetch(
      "https://us-central1-givers-229af.cloudfunctions.net/webApi/helptypes"
    )
      .then(response => response.json())
      .then(json => this.setState({ needs: json }));
  }

  manageNeeds(key) {
    console.log(key);
    let prev = this.state.selectedNeeds;
    if (
      !prev.find(x => {
        return x == key;
      })
    ) {
      prev.push(key);
    } else {
      prev = prev.filter(x => {
        return key !== x;
      });
    }
    this.setState({ selectedNeeds: prev }, () => {
      console.log(prev);
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 2,
          flexDirection: "column",
          justifyContent: "space-around",
          padding: 15
        }}
      >
        <ScrollView>
          <Label style={styles.labels}>Necesidades</Label>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 3,
              flexWrap: "wrap"
            }}
          >
            {this.state.needs.map(element => {
              return (
                <Button
                  style={styles.tiles}
                  key={element.id}
                  onPress={() => {
                    this.manageNeeds(element.id);
                  }}
                >
                  {element.data.icon ? (
                    <Icon
                      name={element.data.icon}
                      style={{ color: "black" }}
                    ></Icon>
                  ) : (
                    ""
                  )}
                  <Text
                    style={{
                      color: "black"
                    }}
                  >
                    {element.data.description}
                  </Text>
                </Button>
              );
            })}
          </View>
        </ScrollView>
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
  }
});
export default Needs;
