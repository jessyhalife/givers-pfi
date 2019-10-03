import React, { Component } from "react";
import { View, ScrollView, StyleSheet, TouchableHighlight } from "react-native";
import {
  Form,
  Item,
  Input,
  Label,
  Text,
  Content,
  Button,
  H2,
  List,
  ListItem
} from "native-base";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Geocoder from "react-native-geocoding";
Geocoder.init("AIzaSyCzOx_nARYJW68tQKsdnirAeMCtd8B1_Fc");
class Principal extends Component {
  state = {
    person: {
      ages: [],
      qty: 1,
      location: {}
    },
    address: "",
    list_ages: [],
    loading: false
  };

  componentDidMount() {
    this.setState(
      {
        person: this.props.data
      },
      () => {}
    );
    this._fetchAges();
    console.log("entra aca el hdp");
    // Geocoder.from({
    //   latitude: this.state.person.location.lat,
    //   longitude: this.state.person.location.lng
    // })
    Geocoder.from({
      latitude: -34.58422666666667,
      longitude: -58.44041666666667
    }).then(json => {
      this.setState({ address: json.results[0].formatted_address });
      this.GooglePlacesRef.setAddressText(this.state.address);
    });
  }

  _fetchAges() {
    fetch("https://us-central1-givers-229af.cloudfunctions.net/webApi/ages")
      .then(response => response.json())
      .then(json => this.setState({ list_ages: json }))
      .then(() => this.setState({ loading: false }));
  }
  manageAges(key) {
    let prev = this.state.person.ages;
    if (
      !prev.find(x => {
        return x == key;
      })
    ) {
      prev.push(key);
    } else {
      prev = prev.filter(x => {
        return key !== x;
      });
    }
    this.setState({ person: { ...this.state.person, ages: prev } }, () => {
      console.log("handling change");
      //this.props.handleChange(this.state.person);
    });
  }
  render() {
    const { ages } = this.state.person;
    return (
      <View
        style={{
          flex: 2,
          flexDirection: "column",
          justifyContent: "space-around",
          padding: 15,
          paddingLeft: 0,
          paddingRight: 0
        }}
      >
        {this.state.loading ? (
          <SkeletonPlaceholder>
            {[0, 1, 2, 3, 4].map((_, index) => (
              <View key={index} style={{ marginBottom: 12 }}>
                <SkeletonPlaceholder>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: 100, height: 100 }} />
                    <View
                      style={{
                        justifyContent: "space-between",
                        marginLeft: 12,
                        flex: 1
                      }}
                    >
                      <View style={{ width: "50%", height: 20 }} />
                      <View style={{ width: "30%", height: 20 }} />
                      <View style={{ width: "80%", height: 20 }} />
                    </View>
                  </View>
                </SkeletonPlaceholder>
              </View>
            ))}
          </SkeletonPlaceholder>
        ) : (
          <ScrollView>
            <List>
              <ListItem>
                <Label style={styles.labels}>UBICACIÓN</Label>
              </ListItem>
              <ListItem>
                <GooglePlacesAutocomplete
                  ref={instance => {
                    this.GooglePlacesRef = instance;
                  }}
                  placeholder="Search"
                  getDefaultValue={() => this.state.address}
                  value={this.state.address}
                  minLength={3} // minimum length of text to search
                  returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                  listViewDisplayed="false" // true/false/undefined
                  renderDescription={row => row.description || row.vicinity} // custom description render
                  fetchDetails={true}
                  onPress={(data, details) => {
                    // 'details' is provided when fetchDetails = true
                    this.setState(
                      {
                        person: {
                          ...this.state.person,
                          location: details.geometry.location
                        },
                        address: data.description || data.vicinity
                      },
                      () => {
                        console.log(this.state.person);
                        console.log(this.state.address);
                      }
                    );
                  }}
                  query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: "AIzaSyBAZBpWYMUskFgPU_LATPHd521AKJ3CEz4", //"AIzaSyCzOx_nARYJW68tQKsdnirAeMCtd8B1_Fc",
                    language: "es", // language of the results
                    types: "address" // default: 'geocode'
                  }}
                  currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                  currentLocationLabel="Ubicación actual"
                  nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                  GoogleReverseGeocodingQuery={
                    {
                      // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    }
                  }
                  GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: "distance"
                  }}
                  filterReverseGeocodingByTypes={[
                    "locality",
                    "administrative_area_level_3"
                  ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                  // predefinedPlaces={[homePlace, workPlace]}
                  debounce={0} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                  // renderLeftButton={() => (
                  //   <Image source={require("path/custom/left-icon")} />
                  // )}
                  styles={{
                    textInputContainer: {
                      backgroundColor: "rgba(0,0,0,0)",
                      borderColor: "#D9D5DC",
                      borderWidth: 1,
                      marginBottom: 11
                    },
                    textInput: {
                      marginLeft: 0,
                      marginRight: 0,
                      height: 38,
                      color: "#5d5d5d",
                      fontSize: 16
                    },
                    predefinedPlacesDescription: {
                      color: "#1faadb"
                    }
                  }}
                />
              </ListItem>
              <ListItem>
                <Label style={styles.labels}>EDADES</Label>
              </ListItem>
              <ListItem>
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
                  {this.state.list_ages.map(element => {
                    return (
                      <Button
                        onPress={() => {
                          this.manageAges(element.id);
                        }}
                        style={
                          ages.find(x => {
                            return x == element.id;
                          })
                            ? press.pressed
                            : styles.tiles
                        }
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
              </ListItem>
              <ListItem>
                <Label style={styles.labels}>¿CUÁNTOS SON?</Label>

                <Item regular>
                  <Input keyboardType={"numeric"}></Input>
                </Item>
              </ListItem>
            </List>
          </ScrollView>
        )}
      </View>
    );
  }
}
const press = StyleSheet.create({
  pressed: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a0e268",
    width: 100,
    height: 100,
    margin: 10,
    color: "#000",
    fontWeight: "bold"
  }
});
const styles = StyleSheet.create({
  tiles: {
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 100,
    height: 100,
    margin: 10
  },
  labels: {
    fontSize: 16,
    // fontFamily: "cabifycircularweb_bold",
    color: "#8c8c8c",
    marginBottom: 13
  }
});
export default Principal;
