import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Form, Item, Input, Label, Text, Content, Button } from "native-base";
/*Make it stateless and recieve navigation as props*/
const ages = ["A", "B", "C", "D", "E"];
class Principal extends Component {
  state = {
  };
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
          <Label style={styles.labels}>Ubicación</Label>
          <Input placeholder="Ubicación actual" placeholderTextColor="#ddd" />

          <Label style={styles.labels}>Edades</Label>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 3
            }}
          >
            {ages.map(element => {
              return (
                <Button style={styles.tiles}>
                  <Text style={{ color: "black", fontWeight: 'bold', alignSelf: 'center' }}>{element}</Text>
                </Button>
              );
            })}
          </View>
          <Label style={styles.labels}>¿Cuántos son?</Label>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 3
            }}
          >
            {ages.map(element => {
              return (
                <Button style={styles.tiles}>
                  <Text style={{ color: "black", fontWeight: 'bold', alignSelf: 'center' }}>{element}</Text>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
    borderRadius: 50,
    width: 50,
    height: 50
  },
  labels: {
    fontSize: 20,
    fontWeight: "bold"
  }
});
export default Principal;
