import React, { Component } from "react";
import { View, ActivityIndicator, Text } from "react-native";

export default class Activity extends Component {
  state = {
    data: ["not yet"]
  };

  componentDidMount() {
    fetch(
      "https://us-central1-givers-229af.cloudfunctions.net/webApi/helptypes"
    )
      .then(response => response.json())
      .then(json => this.setState({ data: json }));
  }

  render() {
    const { data } = this.state;
    return (
      <View>
        <Text>
          {data.map(x => {
            return <Text> {x.description} </Text>;
          })}
        </Text>
      </View>
    );
  }
}
