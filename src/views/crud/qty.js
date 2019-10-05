import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Input, Item, Button, H1 } from "native-base";
import { THEMECOLOR } from "../../const.js";
class QtyComponent extends Component {
  state = {
    loading: true,
    ages: [],
    qty: 1
  };

  async componentDidMount() {
    this.setState({ loading: true }); //, qty: this.props.cant });
    await this._fetchAges().then(() => {
      console.log(this.props.getState());
      if (this.props.getState().length >= 2) {
        console.log(this.props.getState().length);
        if (this.props.getState()[1].hasOwnProperty("qty"))
          this.setState({ qty: this.props.getState()[1].qty });
      }
    });
  }

  async _fetchAges() {
    fetch("https://us-central1-givers-229af.cloudfunctions.net/webApi/ages")
      .then(response => response.json())
      .then(json => {
        let arr = json;
        arr.forEach(x => {
          x.active = false;
        });
        this.setState({ ages: json }, () => {
          if (this.props.getState().length >= 2) {
            if (this.props.getState()[1].hasOwnProperty("ages")) {
              let selected = this.props.getState()[1].ages;
              selected.forEach((x, i) => {
                this.manageAges(x);
              });
            }
          }
        });
      })
      .then(() => this.setState({ loading: false }, () => {}));
  }
  manageAges(key) {
    let prev = this.state.ages;
    let found = prev.findIndex(x => x.id == key);
    if (found >= 0) prev[found].active = !prev[found].active;
    var { qty } = this.state;
    var act = prev.filter(x => {
      return x.active;
    }).length;
    if (act > qty) {
      console.log(nr);
      let nr = Number(act) - Number(qty);
      qty += nr;
      console.log(nr);
      console.log(qty);
      qty = qty.toString();
    }
    this.setState({ ages: prev, qty });
  }
  render() {
    return (
      <View>
        <ScrollView>
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
          <View style={{ position: "relative", width: "100%" }}>
            <Button
              style={{ ...styles.button, backgroundColor: THEMECOLOR }}
              onPress={() => {
                this.props.saveState(1, {
                  qty: this.state.qty,
                  ages: this.state.ages
                    .filter(x => x.active)
                    .map(y => {
                      return y.id;
                    })
                });
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
            <Button
              bordered
              light
              style={{ ...styles.button, backgroundColor: "white" }}
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
        </ScrollView>
      </View>
    );
  }
}
const press = StyleSheet.create({
  pressed: {
    borderColor: "#a6eee6",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a6eee6",
    width: 150,
    height: 50,
    margin: 10,
    color: "#766605",
    fontWeight: "bold",
    borderRadius: 20
  }
});
const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 60
  },
  white: {
    backgroundColor: "white"
  },
  tiles: {
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 150,
    height: 50,
    margin: 10,
    borderRadius: 20
  }
});
export default QtyComponent;
