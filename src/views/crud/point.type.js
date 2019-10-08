import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Input, Item, Button, H1, H3 } from "native-base";
import { THEMECOLOR, THEMECOLORLIGHT } from "../../const.js";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Header from "../../components/header";
class PointTypeComponent extends Component {
  render() {
    return (
      <View>
        <ScrollView>
          <Header
            title="¿Qué vas a registrar?"
            showBack={true}
            back={() => {
              this.props.prev();
            }}
          ></Header>
          <Text style={{ fontSize: 16, margin: 15 }}>
            Recordá que la diferencia entre los eventos y puntos de ayuda es que
            los primeros deben tener fecha de inicio y de fin.
          </Text>
          <View
            style={{
              margin: 50,
              flexDirection: "row",
              marginTop: 100,
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.saveState(0, "E");
                this.props.next();
              }}
              style={{
                ...styles.tile,
                backgroundColor: "white",
                alignItems: "center"
              }}
            >
              <Icon name="event" color="#ababab" size={60} />
              <Text
                style={{
                  marginTop: 20,
                  color: "#ababab",
                  position: "absolute",
                  bottom: 10
                }}
              >
                Evento solidario
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.saveState(0, "H");
                this.props.next();
              }}
              style={{
                ...styles.tile,
                backgroundColor: "white",
                alignItems: "center"
              }}
            >
              <Icon name="home" color="#ababab" size={60} />
              <Text
                style={{
                  marginTop: 20,
                  color: "#ababab",
                  position: "absolute",
                  bottom: 10
                }}
              >
                Punto de ayuda
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tile: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
    borderRadius: 10,
    paddingTop: 20,
    height: 150,
    width: 150,
    color: "#dcdcdc",
    elevation: 2
  }
});

export default PointTypeComponent;
