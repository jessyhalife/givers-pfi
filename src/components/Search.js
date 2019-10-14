import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Switch,
  ScrollView
} from "react-native";
import { Button, ListItem, CheckBox } from "native-base";
import Geocoder from "react-native-geocoding";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Icon from "react-native-vector-icons/AntDesign";
import Modal from "react-native-modal";
import { THEMECOLOR, THEMECOLORLIGHT } from "../const.js";
Geocoder.init("AIzaSyBZac8n4qvU063aXqkGnYshZX3OQcBJwJc");
class Search extends Component {
  state = {
    modal: false,
    filters: 0,
    needs: [],
    ages: [],
    showNeeds: false,
    showAges: false,
    types: {
      personas: true,
      eventos: true,
      points: true
    }
  };

  filter = () => {
    var { people, events } = this.props;
    if (!this.state.types.personas) {
      people = [];
    } else {
      if (this.state.needs.length > 0) {
        people = people.filter(x => {
          return this._containsAll(x.needs, this.state.needs);
        });
      }
    }
    console.log(events);
    if (!this.state.types.events) {
      events = [];
    } else {
      if (this.state.needs.length > 0) {
        events = events.filter(x => {
          return this._containsAll(x.needs, this.state.needs);
        });
      }
    }

    this.props.filtrar(people, events);
  };
  _containsAll(array, array2) {
    var exists = true;
    if (array === undefined) {
      exists = false;
    } else {
      array2.forEach(x => {
        if (array.indexOf(x) < 0) {
          exists = false;
        }
      });
    }
    return exists;
  }

  changeNeed(id) {
    let prev = this.state.needs ? this.state.needs : [];

    if (!prev.some(x => x === id)) {
      prev.push(id);
    } else {
      prev = prev.filter(x => x !== id);
    }

    this.setState({ needs: prev });
  }
  componentDidMount() {
    console.log("monto");
    console.log(this.state.needs);
  }
  render() {
    return (
      <View>
        <StatusBar backgroundColor={THEMECOLOR} barStyle="dark-content" />
        <View
          style={{
            paddingTop: 10,
            position: "absolute",
            width: "100%",
            backgroundColor: THEMECOLOR
          }}
        >
          <GooglePlacesAutocomplete
            ref={instance => {
              this.GooglePlacesRef = instance;
            }}
            placeholder="Buscar dirección"
            minLength={3} // minimum length of text to search
            returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed="true" // true/false/undefined
            renderDescription={row => row.description || row.vicinity} // custom description render
            fetchDetails={true}
            onPress={(data, details) => {
              this.props.setMapRegion(details.geometry.location);
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: "AIzaSyBAZBpWYMUskFgPU_LATPHd521AKJ3CEz4", //"AIzaSyCzOx_nARYJW68tQKsdnirAeMCtd8B1_Fc",
              language: "es", // language of the results
              types: "address" // default: 'geocode'
            }}
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: "distance"
            }}
            filterReverseGeocodingByTypes={[
              "locality",
              "administrative_area_level_3"
            ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            // predefinedPlaces={[homePlace, workPlace]}
            debounce={0}
            styles={{
              textInputContainer: {
                backgroundColor: "rgba(0,0,0,0)",
                marginBottom: 20,
                width: "90%",
                alignText: "center",
                alignSelf: "center"
              },
              textInput: {
                marginLeft: 5,
                marginRight: 5,

                height: 40,
                color: "#5d5d5d",
                fontSize: 16,

                borderRadius: 30
              },
              predefinedPlacesDescription: {
                color: "#1faadb"
              },
              listView: {
                backgroundColor: "white"
              }
            }}
          />
          <View
            style={{
              ...styles.filterBar,
              flexDirection: "row",
              textAlign: "center",
              justifyContent: "flex-end"
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginRight: 10
              }}
              onPress={() => this.setState({ modal: true })}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  marginRight: 3,
                  color: "#3175f6",
                  alignSelf: "center"
                }}
              >
                Filtrar
              </Text>
              <Icon
                size={14}
                style={{ alignSelf: "center" }}
                name="filter"
                color="#3175f6"
              ></Icon>
            </TouchableOpacity>
          </View>
          <View>
            <Modal
              backdropOpacity={0.3}
              isVisible={this.state.modal}
              animationIn="slideInUp"
              style={{ margin: 50 }}
              // customBackdrop={<View style={{ flex: 1 }} />}
            >
              <View style={{ elevation: 4 }}>
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "white",
                    padding: 20
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Filtrar por:
                  </Text>

                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text>Personas</Text>
                    <Switch
                      trackColor={{ true: THEMECOLORLIGHT }}
                      thumbColor={THEMECOLOR}
                      onValueChange={() =>
                        this.setState({
                          types: {
                            ...this.state.types,
                            personas: !this.state.types.personas
                          }
                        })
                      }
                      value={this.state.types.personas}
                    ></Switch>
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text>Eventos</Text>
                    <Switch
                      trackColor={{ true: THEMECOLORLIGHT }}
                      thumbColor={THEMECOLOR}
                      onValueChange={() =>
                        this.setState({
                          types: {
                            ...this.state.types,
                            eventos: !this.state.types.eventos
                          }
                        })
                      }
                      value={this.state.types.eventos}
                    ></Switch>
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text>Puntos de ayuda</Text>
                    <Switch
                      trackColor={{ true: THEMECOLORLIGHT }}
                      thumbColor={THEMECOLOR}
                      onValueChange={() =>
                        this.setState({
                          types: {
                            ...this.state.types,
                            points: !this.state.types.points
                          }
                        })
                      }
                      value={this.state.types.points}
                    ></Switch>
                  </View>
                  <View
                    style={{
                      borderColor: "#eee",
                      marginTop: 15,
                      marginBottom: 10,
                      borderBottomWidth: 1
                    }}
                  />
                  <View
                    style={
                      this.state.showNeeds ? { height: 100 } : { undefined }
                    }
                  >
                    <TouchableOpacity
                      style={{ flexDirection: "row" }}
                      onPress={() =>
                        this.setState({ showNeeds: !this.state.showNeeds })
                      }
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          marginRight: 10
                        }}
                      >
                        Tipo de ayuda
                      </Text>
                      <Icon
                        style={{ alignSelf: "center" }}
                        name="arrowdown"
                      ></Icon>
                    </TouchableOpacity>
                    {this.state.showNeeds ? (
                      <ScrollView>
                        {this.props.needs.map(n => {
                          return (
                            <ListItem last key={n.id}>
                              <CheckBox
                                onPress={() => {
                                  this.changeNeed(n.id);
                                }}
                                checked={
                                  this.state.needs.filter(x => x === n.id)
                                    .length == 1
                                }
                                style={{ marginRight: 10 }}
                              ></CheckBox>
                              <Text style={{ marginLeft: 10 }}>
                                {n.data.description}
                              </Text>
                            </ListItem>
                          );
                        })}
                      </ScrollView>
                    ) : (
                      undefined
                    )}
                  </View>
                  <View style={{ marginTop: 6 }}>
                    <TouchableOpacity
                      style={{ flexDirection: "row" }}
                      onPress={() =>
                        this.setState({ showAges: !this.state.showAges })
                      }
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          marginRight: 10
                        }}
                      >
                        Edades
                      </Text>
                      <Icon
                        style={{ alignSelf: "center" }}
                        name="arrowdown"
                      ></Icon>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ textAlign: "center" }}>
                  <Button
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: THEMECOLOR,
                      width: "100%"
                    }}
                    onPress={() => {
                      this.filter();
                      this.setState({ modal: false });
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Aplicar
                    </Text>
                  </Button>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filterBar: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.0,
    backgroundColor: "white",
    height: 45,
    elevation: 4,
    padding: 14
  }
});

export default Search;
