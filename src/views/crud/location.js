import React, { Component } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { H1, Text, Button } from "native-base";
import mapStyle from "../../assets/mapStyle";
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
import Header from "../../components/header";
import ButtonsWizard from "../../components/buttons_wizard";
import getDistance from "geolib/es/getDistance";

Geocoder.init("AIzaSyBZac8n4qvU063aXqkGnYshZX3OQcBJwJc");

class LocationStep extends Component {
  state = {
    currentLocation: {},
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
    mapReady: false,
    validDate: true
  };

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setLocation(position.coords, () => {
          Geocoder.from({
            latitude: this.state.initialRegion.latitude,
            longitude: this.state.initialRegion.longitude
          }).then(json => {
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

  componentDidMount() {
    if (
      this.props.getState().length == this.props.index ||
      (this.props.getState().length > this.props.index &&
        !this.props.getState()[this.props.index].hasOwnProperty("latitude"))
    ) {
      this.getCurrentLocation();
    } else {
      this.setLocation(this.props.getState()[this.props.index], () => {
        Geocoder.from({
          latitude: this.state.initialRegion.latitude,
          longitude: this.state.initialRegion.longitude
        }).then(json => {
          this.GooglePlacesRef.setAddressText(
            json.results[0].formatted_address
          );
          this.mapRef.animateToRegion(this.state.initialRegion, 100);
          //this.userMarker.animateMarkerToCoordinate(this.state.marker, 2000);
        });
      });
    }
  }
  validateDate(location) {
    navigator.geolocation.getCurrentPosition(position => {
      let distance = getDistance(position.coords, location);
      this.setState({ validDate: distance / 1000 <= 5 });
    });
  }
  setLocation(data, callback) {
    let lat = data.hasOwnProperty("latitude") ? data.latitude : data.lat;
    let long = data.hasOwnProperty("longitude") ? data.longitude : data.lng;
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
        if (!this.props.event)
          this.validateDate({ latitude: lat, longitude: long });
      }
    );
  }

  render() {
    return (
      <View style={{ flexDirection: "column" }}>
        <ScrollView>
          <Header
            showBack={true}
            title="¿Dónde?"
            back={() => {
              this.props.prev();
            }}
          />
          <View style={{ flex: 3 }}>
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
                  // this.mapView.animateToRegion(this.state.initialRegion, 2000);
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
          </View>
          <View style={{ flex: 3 }}>
            <MapView
              customMapStyle={mapStyle}
              provider={PROVIDER_GOOGLE}
              ref={ref => {
                this.mapRef = ref;
              }}
              style={styles.map}
              region={this.state.initialRegion}
              followUserLocation={true}
              onRegionChangeComplete={data => {
                this.setState({
                  initialRegion: {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    latitudeDelta: data.latitudeDelta,
                    longitudeDelta: data.longitudeDelta
                  }
                });
              }}
              zoomEnabled={true}
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
                      // this.mapRef.animateToRegion(
                      //   this.state.initialRegion,
                      //   2000
                      // );
                      Geocoder.from({
                        latitude: this.state.initialRegion.latitude,
                        longitude: this.state.initialRegion.longitude
                      }).then(json => {
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
        </ScrollView>
        <ButtonsWizard
          showAnterior={this.props.showAnterior}
          disabled={!this.state.validDate}
          titleSiguiente={
            this.state.validDate ? undefined : "Debes estar a menos de 5km"
          }
          siguiente={() => {
            let location = {
              latitude: this.state.marker.latitude,
              longitude: this.state.marker.longitude
            };
            this.props.saveState(this.props.index, location);
            this.props.next(location);
          }}
          back={() => {
            this.props.saveState(this.props.index, location);
            this.props.prev();
          }}
        />
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
