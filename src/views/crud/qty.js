import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Input, Item, Button, H1, Separator } from "native-base";
import { THEMECOLOR } from "../../const.js";
import Header from "../../components/header";
import ButtonsWizard from "../../components/buttons_wizard";

class QtyComponent extends Component {
  state = {
    loading: true,
    ages: [],
    qty: 1
  };

  async componentDidMount() {
    this.setState({ loading: true }); //, qty: this.props.cant });
    // await this._fetchAges().then(() => {
    if (this.props.getState().length >= this.props.index + 1) {
      if (this.props.getState()[this.props.index].hasOwnProperty("qty"))
        this.setState({ qty: this.props.getState()[this.props.index].qty });
    }

    let list = this.props.ages;
    list.forEach(x => {
      x.active = false;
    });

    this.setState({ ages: list }, () => {
      if (this.props.getState().length >= this.props.index + 1) {
        if (this.props.getState()[this.props.index].hasOwnProperty("ages")) {
          let selected = this.props.getState()[this.props.index].ages;
          selected.forEach(x => {
            this.manageAges(x);
          });
        }
      }
    });
  }

  manageAges(key) {
    let prev = this.state.ages;
    let found = prev.findIndex(x => x.id == key);
    if (found >= 0) prev[found].active = !prev[found].active;
    var { qty } = this.state;
    var act = prev.filter(x => {
      return x.active;
    }).length;
    if (Number(act) > Number(qty)) {
      let nr = Number(act) - Number(qty);
      console.log(`nro: ${nr}`);
      qty = Number(qty) + Number(nr);

      qty = qty.toString();
    }
    this.setState({ ages: prev, qty });
  }
  render() {
    return (
      <View>
        <ScrollView>
          <Header
            showBack={true}
            title="¿Cuántos son?"
            back={() => {
              this.props.prev();
            }}
          />
          <View>
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
                        color: element.active ? "white" : "black"
                      }}
                    >
                      {element.data.tipo}
                    </Text>
                  </Button>
                );
              })}
            </View>
          </View>
          <ButtonsWizard
            showAnterior={true}
            siguiente={() => {
              this.props.saveState(this.props.index, {
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
            back={() => {
              this.props.saveState(this.props.index, {
                qty: this.state.qty,
                ages: this.state.ages
                  .filter(x => x.active)
                  .map(y => {
                    return y.id;
                  })
              });
              this.props.prev({
                qty: this.state.qty,
                ages: this.state.ages.filter(x => x.active)
              });
            }}
          />
        </ScrollView>
      </View>
    );
  }
}
const press = StyleSheet.create({
  pressed: {
    borderColor: THEMECOLOR,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEMECOLOR,
    width: 150,
    height: 50,
    margin: 10,
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
