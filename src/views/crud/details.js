import { View, TextInput, StyleSheet } from "react-native";
import React, { Component } from "react";
import { Text, Textarea, Button, H1 } from "native-base";
import { THEMECOLOR } from "../../const.js";
class DetailsComponent extends Component {
  state = {
    details: ""
  };
  render() {
    return (
      <View>
        <View style={{ marginTop: 20, marginLeft: 20, marginBottom: 20 }}>
          <H1 style={{ fontWeight: "bold" }}>¿Algo que quieras agregar?</H1>
        </View>
        <Textarea
          value={this.state.details}
          onChange={e => this.setState({ details: e.nativeEvent.text })}
          rowSpan={5}
          bordered
        />
        <View>
          <Button
            bordered
            light
            style={styles.button}
            onPress={() => {
              this.props.prev();
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
              this.props.submit({ details: this.state.details });
            }}
          >
            <Text
              style={{
                color: "white",
                alignItems: "center",
                fontWeight: "bold"
              }}
            >
              GUARDAR
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 60
  }
});
export default DetailsComponent;
