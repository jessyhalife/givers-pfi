import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon, Button } from "native-base";
export default PeopleView = props => {
  const view = props.data;
  console.log(view);
  return (
    <View>
      <View>
        <Text>{view.location._latitude}</Text>
        <Text>{view.location._longitude}</Text>
      </View>
      <View>
        <View style={{flexDirection: "column"}}>
          <Icon name="eye"></Icon>
          <Text>{view.seen}</Text>
        </View>
        <View>
          <Icon name="eye-off"></Icon>
          <Text>{view.not_seen}</Text>
        </View>
      </View>
    </View>
  );
};
