import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Input, Item, Button, H1 } from "native-base";
import { THEMECOLOR } from "../../const.js";
class QtyComponent extends Component {
  state = {
    loading: true,
    ages: [],
    qty: 1
  };

  componentDidMount() {
    console.log(this.state);
    this.setState({ loading: true }); //, qty: this.props.cant });
    this._fetchAges();
  }

  _fetchAges() {
    fetch("https://us-central1-givers-229af.cloudfunctions.net/webApi/ages")
      .then(response => response.json())
      .then(json => {
        let arr = json;
        arr.forEach(x => {
          x.active = false;
        });
        this.setState({ ages: json });
      })
      .then(() => this.setState({ loading: false }, () => {}));
  }
  manageAges(key) {
    let prev = this.state.ages;
    console.log(key);
    let found = prev.findIndex(x => x.id == key);
    console.log(found);
    if (found >= 0) prev[found].active = !prev[found].active;
    console.log(prev);
    this.setState({ ages: prev });
  }
  render() {
    return (
      <View style={{ flexDirection: "column" }}>
        <View style={{ flex: 2, marginTop: 20, marginLeft: 20 }}>
          <H1 style={{ fontWeight: "bold" }}>¿Cuántos son?</H1>
          <Item regular style={{ margin: 20 }}>
            <Input
              keyboardType="numeric"
              value={this.state.qty.toString()}
              onChange={e => {
                this.setState({ qty: e.nativeEvent.text });
              }}
            />
          </Item>
        </View>
        <View style={{ flex: 4, marginTop: 20, marginLeft: 20 }}>
          <H1 style={{ fontWeight: "bold" }}>Y sus edades?</H1>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: 10,
              marginBottom: 3
            }}
          >
            {this.state.ages.map(element => {
              return (
                <Button
                  onPress={() => {
                    this.manageAges(element.id);
                  }}
                  style={element.active ? press.pressed : styles.tiles}
                  key={element.id}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      color: "black"
                    }}
                  >
                    {element.data.tipo}
                  </Text>
                </Button>
              );
            })}
          </View>
        </View>
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
              this.props.next({
                qty: this.state.qty,
                ages: this.state.ages.filter(x => x.active)
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
const press = StyleSheet.create({
  pressed: {
    borderColor: "#ffe965",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffe965",
    width: 150,
    height: 50,
    margin: 10,
    color: "#766605",
    fontWeight: "bold"
  }
});
const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 60
  },
  tiles: {
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 150,
    height: 50,
    margin: 10
  }
});
export default QtyComponent;
