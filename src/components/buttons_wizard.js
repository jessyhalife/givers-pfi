import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "native-base";
import { THEMECOLOR } from "../const";
/*Componente de botones para wizard*/
const ButtonsWizard = props => {
  return (
    <View style={{ bottom: 0, position: "relative" }}>
      <Button
        style={{ ...styles.button, backgroundColor: THEMECOLOR }}
        onPress={() => {
          props.siguiente();
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
      {props.showAnterior ? (
        <Button
          bordered
          light
          style={{ ...styles.button, backgroundColor: "white" }}
          onPress={() => {
            props.back();
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
      ) : (
        undefined
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 60
  }
});
export default ButtonsWizard;
