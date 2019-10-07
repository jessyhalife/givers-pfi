import React, { Component } from "react";
import { Text, Button, H1, Icon } from "native-base";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar
} from "react-native";
import { THEMECOLOR } from "../../const.js";
import Header from "../../components/header";
import ButtonsWizard from "../../components/buttons_wizard";

class NeedsComponent extends Component {
  state = {
    needs: [],
    selectedNeeds: [],
    loading: true
  };

  componentDidMount() {
    this._fetchNeeds();
  }

  _fetchNeeds() {
    fetch(
      "https://us-central1-givers-229af.cloudfunctions.net/webApi/helptypes"
    )
      .then(response => response.json())
      .then(json => {
        let arr = json;
        arr.forEach(x => {
          x.active = false;
        });
        this.setState({ needs: json, loading: false }, () => {
          if (this.props.getState().length >= 3) {
            if (this.props.getState()[2].hasOwnProperty("needs")) {
              let selected = this.props.getState()[2].needs;
              selected.forEach(x => {
                this.manageNeeds(x);
              });
            }
          }
        });
      });
  }

  manageNeeds(key) {
    let prev = this.state.needs;
    console.log(key);
    let found = prev.findIndex(x => x.id == key);
    console.log(found);
    if (found >= 0) prev[found].active = !prev[found].active;
    console.log(prev);
    this.setState({ needs: prev });
  }
  render() {
    return (
      <View>
        <ScrollView>
          <Header
            showBack={true}
            title={this.props.title}
            back={() => {
              this.props.prev();
            }}
          />
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "stretch",
              justifyContent: "center"
            }}
          >
            <FlatList
              contentContainerStyle={{
                alignItems: "center",
                flex: 1,
                justifyContent: "center"
              }}
              data={this.state.needs}
              keyExtractor={item => item.id}
              numColumns={3}
              renderItem={({ item }) => (
                <View style={{ margin: 3, alignItems: "center" }}>
                  <TouchableOpacity
                    style={
                      !item.active
                        ? styles.tiles
                        : { ...styles.tiles, ...styles.selectedTile }
                    }
                    onPress={() => {
                      this.manageNeeds(item.id);
                    }}
                  >
                    <Icon
                      name={item.data.icon}
                      style={
                        !item.active ? { color: "#ddd" } : { color: "white" }
                      }
                    ></Icon>
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginTop: 10,
                      marginBottom: 15,
                      width: 100,
                      textAlign: "center"
                    }}
                  >
                    {item.data.description}
                  </Text>
                </View>
              )}
            ></FlatList>
          </View>
          <ButtonsWizard
            showAnterior={true}
            siguiente={() => {
              this.props.saveState(2, {
                needs: this.state.needs
                  .filter(x => x.active)
                  .map(y => {
                    return { id: y.id };
                  })
              });
              this.props.next({
                needs: this.state.needs
                  .filter(x => x.active)
                  .map(y => {
                    return { id: y.id };
                  })
              });
            }}
            back={() => {
              this.props.saveState(2, {
                needs: this.state.needs
                  .filter(x => x.active)
                  .map(y => {
                    return { id: y.id };
                  })
              });
              this.props.prev({
                needs: this.state.needs.filter(x => x.active)
              });
            }}
          />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    color: "gray"
  },
  selectedTile: {
    elevation: 0,
    backgroundColor: "#a6eee6"
  },
  tiles: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#f8f8f8",
    borderRadius: 50,
    elevation: 2
  },
  labels: {
    fontSize: 20,
    fontWeight: "bold"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 60
  },
  bottomView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", //Here is the trick
    bottom: 0 //Here is the trick
  }
});
export default NeedsComponent;
