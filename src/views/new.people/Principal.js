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

class Principal extends Component {
  state = {
    ages: [],
    qty: 1,
    selectedAges: [],
    location: {},
    loading: true
  };

  componentDidMount() {
    this.setState({ location: this.props.data.location, loading: true });
    this._fetchAges();
  }

  _fetchAges() {
    fetch("https://us-central1-givers-229af.cloudfunctions.net/webApi/ages")
      .then(response => response.json())
      .then(json => this.setState({ ages: json }))
      .then(() => this.setState({ loading: false }));
  }
  manageAges(key) {
    console.log(key);
    let prev = this.state.selectedAges;
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
    this.setState({ selectedAges: prev }, () => {
      console.log(prev);
    });
  }
  render() {
    const { selectedAges } = this.state;
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
                  placeholder="Search"
                  minLength={3} // minimum length of text to search
                  returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                  listViewDisplayed="auto" // true/false/undefined
                  renderDescription={row => row.description} // custom description render
                  fetchDetails={false}
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                  }}
                  getDefaultValue={() => ""}
                  query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: "AIzaSyCzOx_nARYJW68tQKsdnirAeMCtd8B1_Fc",
                    language: "es", // language of the results
                    types: "address" // default: 'geocode'
                  }}
                  currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                  currentLocationLabel="Current location"
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
                  {this.state.ages.map(element => {
                    return (
                      <Button
                        onPress={() => {
                          this.manageAges(element.id);
                        }}
                        style={
                          selectedAges.find(x => {
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
                <Item>
                  <Label style={styles.labels}>¿CUÁNTOS SON?</Label>
                </Item>
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
