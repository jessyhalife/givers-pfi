import React, { Component } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { H1, Text, Button } from "native-base";
import MapView, {
  Marker,
  AnimatedRegion,
  PROVIDER_GOOGLE
} from "react-native-maps";
const { height, width } = Dimensions.get("window");
import { THEMECOLOR } from "../../const.js";
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
import Geocoder from "react-native-geocoding";
Geocoder.init("AIzaSyBZac8n4qvU063aXqkGnYshZX3OQcBJwJc");

class LocationStep extends Component {
  state = {
    initialRegion: {
      latitude: 35,
      longitude: 45,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    },
    marker: {
      latitude: 35,
      longitude: 45
    },
    mapReady: false
  };
  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setLocation(position.coords, () => {
          Geocoder.from({
            latitude: this.state.initialRegion.latitude,
            longitude: this.state.initialRegion.longitude
          }).then(json => {
            console.log(json);
            this.GooglePlacesRef.setAddressText(
              json.results[0].formatted_address
            );
            //this.userMarker.animateMarkerToCoordinate(this.state.marker, 2000);
          });
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }
  componentWillMount() {
    console.log("will mount");
    this.getCurrentLocation();
  }
  setLocation(data, callback) {
    let lat = data.hasOwnProperty("latitude") ? data.latitude : data.lat;
    let long = data.hasOwnProperty("longitude") ? data.longitude : data.lng;
    let location = { latitude: lat, longitude: long };
    let region = {
      latitude: Number(lat),
      longitude: Number(long),
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };
    this.setState(
      {
        initialRegion: region,
        marker: { latitude: region.latitude, longitude: region.longitude }
      },
      () => {
        callback();
      }
    );
  }

  render() {
    return (
      <View style={{ flexDirection: "column" }}>
        <View
          style={{ flex: 1, marginTop: 20, marginLeft: 20, marginBottom: 20 }}
        >
          <H1 style={{ fontWeight: "bold" }}>¿Dónde?</H1>
        </View>
        <View style={{ flex: 1 }}>
          <GooglePlacesAutocomplete
            ref={instance => {
              this.GooglePlacesRef = instance;
            }}
            placeholder="Search"
            minLength={3} // minimum length of text to search
            returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed="false" // true/false/undefined
            renderDescription={row => row.description || row.vicinity} // custom description render
            fetchDetails={true}
            onPress={(data, details) => {
              // 'details' is provided when fetchDetails = true
              this.setLocation(details.geometry.location, () => {
                this.mapView.animateToRegion(this.state.initialRegion, 2000);
                this.userMarker.animateMarkerToCoordinate(
                  this.state.marker,
                  2000
                );
              });
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
            debounce={0}
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
                fontSize: 18
              },
              predefinedPlacesDescription: {
                color: "#1faadb"
              }
            }}
          />
        </View>
        <View style={{ flex: 3 }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            ref={ref => {
              this.mapRef = ref;
            }}
            style={styles.map}
            region={this.state.initialRegion}
            followUserLocation={true}
            ref={ref => (this.mapView = ref)}
            zoomEnabled={true}
            showsUserLocation={true}
            onMapReady={() => {
              this.setState({ mapReady: true });
            }}
          >
            {this.state.mapReady &&
            this.state.marker.latitude !== null &&
            this.state.marker.longitude !== null ? (
              <Marker
                ref={marker => {
                  this.userMarker = marker;
                }}
                draggable
                coordinate={{
                  latitude: this.state.marker.latitude,
                  longitude: this.state.marker.longitude
                }}
                onDragEnd={e => {
                  this.setLocation(e.nativeEvent.coordinate, () => {
                    this.mapView.animateToRegion(
                      this.state.initialRegion,
                      2000
                    );
                    Geocoder.from({
                      latitude: this.state.initialRegion.latitude,
                      longitude: this.state.initialRegion.longitude
                    }).then(json => {
                      console.log(json);
                      this.GooglePlacesRef.setAddressText(
                        json.results[0].formatted_address
                      );
                    });
                  });
                }}
              ></Marker>
            ) : (
              undefined
            )}
          </MapView>
        </View>
        <View style={{ flex: 2 }}>
          <Button
            style={{ ...styles.button, backgroundColor: THEMECOLOR }}
            onPress={() => {
              let location = {
                latitude: this.state.marker.latitude,
                longitude: this.state.marker.longitude
              };
              this.props.next(location);
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

const styles = StyleSheet.create({
  map: {
    height: 360
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 60
  }
});
export default LocationStep;
