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
  H2
} from "native-base";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

class Principal extends Component {
  state = {
    ages: [],
    qty: 1,
    selectedAges: []
  };

  componentDidMount() {
    this._fetchAges();
  }

  _fetchAges() {
    fetch("https://us-central1-givers-229af.cloudfunctions.net/webApi/ages")
      .then(response => response.json())
      .then(json => this.setState({ ages: json }));
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
          padding: 15
        }}
      >
        <ScrollView>
          <Label style={styles.labels}>Ubicación</Label>

          <GooglePlacesAutocomplete
            placeholder="Search"
            minLength={2} // minimum length of text to search
            autoFocus={true}
            returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed="auto" // true/false/undefined
            renderDescription={row => row.description} // custom description render
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
          />
          <Label style={styles.labels}>Edades</Label>
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
                      fontFamily: "cabifycircularweb_light",
                      color: selectedAges.find(x => {
                        return x == element.id;
                      })
                        ? "white"
                        : "#696969"
                    }}
                  >
                    {element.data.tipo}
                  </Text>
                </Button>
              );
            })}
          </View>
          <Label style={styles.labels}>¿Cuántos son?</Label>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 3
            }}
          >
            <Button
              rounded
              light
              onPress={() => {
                if (this.state.qty > 1)
                  this.setState({ qty: this.state.qty - 1 });
              }}
            >
              <Text>-</Text>
            </Button>
            <H2>{this.state.qty}</H2>
            <Button
              rounded
              light
              onPress={() => {
                this.setState({ qty: this.state.qty + 1 });
              }}
            >
              <Text>+</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const press = StyleSheet.create({
  pressed: {
    borderColor: "red",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#696969",
    width: 100,
    height: 100,
    margin: 10,
    color: "white",
    fontFamily: "cabifycircularweb_bold"
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
    fontSize: 20,
    fontFamily: "cabifycircularweb_book",
    color: "black"
    // fontWeight: "bold"
  }
});
export default Principal;
