import React, { Component } from "react";
import { View, ScrollView, StyleSheet, TouchableHighlight } from "react-native";
import {
  Form,
  Item,
  Input,
  Label,
  Text,
  Button,
  Icon,
  List,
  ListItem,
  CheckBox,
  Body
} from "native-base";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

class Needs extends Component {
  state = {
    needs: [],
    selectedNeeds: [],
    loading: true,
    idToken: ""
  };

  componentDidMount() {
    let needs = this.props.needs;
    this.setState({ needs });
  }

  // _fetchNeeds() {
  //   fetch(
  //     "https://us-central1-givers-229af.cloudfunctions.net/webApi/helptypes",
  //     {
  //       method: "GET",
  //       headers: new Headers({
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: this.state.idToken
  //       })
  //     }
  //   )
  //     .then(response => response.json())
  //     .then(json => this.setState({ needs: json, loading: false }));
  // }

  manageNeeds(key) {
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
    this.setState({ selectedNeeds: prev }, () => {});
  }

  render() {
    return (
      <View
        style={{
          flex: 2
        }}
      >
        {this.state.loading ? (
          <SkeletonPlaceholder>
            {[0, 1, 2, 3, 4].map((_, index) => (
              <View key={index} style={{ marginBottom: 12 }}>
                <SkeletonPlaceholder>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        justifyContent: "space-between",
                        marginLeft: 12,
                        flex: 1
                      }}
                    >
                      <View style={{ width: "50%", height: 20 }} />
                      <View style={{ width: "30%", height: 20 }} />
                      <View style={{ width: "80%", height: 20 }} />
                    </View>
                  </View>
                </SkeletonPlaceholder>
              </View>
            ))}
          </SkeletonPlaceholder>
        ) : (
          <ScrollView>
            <List>
              <ListItem>
                <Label>NECESIDADES</Label>
              </ListItem>
              {this.state.needs.map(element => {
                return (
                  <ListItem>
                    <TouchableHighlight>
                      <View
                        style={{
                          flexDirection: "row",
                          flex: 3
                        }}
                      >
                        <CheckBox checked={false} key={element.id}></CheckBox>
                        <Text style={{ marginLeft: 3 }}>
                          {element.data.description}
                        </Text>
                      </View>
                    </TouchableHighlight>
                  </ListItem>
                );
              })}
            </List>
          </ScrollView>
        )}
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
