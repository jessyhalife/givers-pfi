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
    let needs = this.props.needs;
    if (this.props.event) {
      needs = needs.filter(x => {
        return x.data.event;
      });
    }
    needs.forEach(x => (x.active = false));
    this.setState({ needs }, () => {
      if (this.props.getState().length >= this.props.index + 1) {
        if (this.props.getState()[this.props.index].hasOwnProperty("needs")) {
          let selected = this.props.getState()[this.props.index].needs;
          selected.forEach(x => {
            this.manageNeeds(x.id);
          });
        }
      }
    });
  }

  // _fetchNeeds() {
  //   fetch(
  //     "https://us-central1-givers-229af.cloudfunctions.net/webApi/helptypes"
  //   )
  //     .then(response => response.json())
  //     .then(json => {
  //       let arr = json;
  //       arr.forEach(x => {
  //         x.active = false;
  //       });
  //       if (this.props.event) {
  //         arr = arr.filter(x => {
  //           return x.data.event;
  //         });
  //       }
  //       this.setState({ needs: arr, loading: false }, () => {
  //         if (this.props.getState().length >= this.props.index + 1) {
  //           if (
  //             this.props.getState()[this.props.index].hasOwnProperty("needs")
  //           ) {
  //             let selected = this.props.getState()[this.props.index].needs;
  //             selected.forEach(x => {
  //               this.manageNeeds(x.id);
  //             });
  //           }
  //         }
  //       });
  //     });
  // }

  manageNeeds(key) {
    let prev = this.state.needs;

    let found = prev.findIndex(x => x.id == key);

    if (found >= 0) prev[found].active = !prev[found].active;

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
              this.props.prev({
                needs: this.state.needs.filter(x => x.active)
              });
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
              this.props.saveState(this.props.index, {
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
              this.props.saveState(this.props.index, {
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
    backgroundColor: THEMECOLOR
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
