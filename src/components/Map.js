import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions, 
  Text
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { THEMECOLOR } from "../const";
const { height, width } = Dimensions.get("window");
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
import { PermissionsAndroid } from "react-native";
import { Fab, Container, Button } from "native-base";
import SlidingUpPanel from "rn-sliding-up-panel";
import PeopleView from "./PeopleView";
import Geocoder from "react-native-geocoding";
import mapStyle from "../assets/mapStyle";
import Icon from "react-native-vector-icons/AntDesign";

Geocoder.init("AIzaSyBZac8n4qvU063aXqkGnYshZX3OQcBJwJc");

export default class MapGiver extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      latitude: 37.421,
      longitude: -122.083,
      locationPermission: true,
      active: false,
      activeMarker: null,
      ages: [],
      needs: [],
      activePanel: false
    };
    this.mapRef = null;
    this.getAges = this.getAges.bind(this);
    this.getNeeds = this.getNeeds.bind(this);
  }
  componentWillReceiveProps(props) {
    this.setState({ markers: props.people }, () => {});
  }
  seen = id => {
    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/seen/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(res => alert("ok!"))
      .catch(error => console.log("Error!!: ", error));
  };
  notSeen = id => {
    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/notSeen/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(res => this._markerInfo(id))
      .catch(error => console.log("Error!!: ", error));
  };
  getAges() {
    fetch("https://us-central1-givers-229af.cloudfunctions.net/webApi/ages")
      .then(response => response.json())
      .then(json => {
        this.setState({ ages: json });
        return;
      });
  }
  getNeeds() {
    fetch(
      "https://us-central1-givers-229af.cloudfunctions.net/webApi/helptypes"
    )
      .then(response => response.json())
      .then(json => {
        this.setState({ needs: json });
        return;
      });
  }
  _markerInfo(key) {
    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/${key}`
    )
      .then(response => response.json())
      .then(json => {
        var pers = json;
        Geocoder.from({
          latitude: pers.location.latitude,
          longitude: pers.location.longitude
        })
          .then(add => {
            pers.address = add.results[0].formatted_address;

            this.setState({ activeMarker: pers }, () => {
              this._panel.show(200, 100);
              this.setState({ activePanel: true });
            });

            this.setState(
              {
                latitude: pers.location.latitude,
                longitude: pers.location.longitude
              },
              () => {}
            );
          })
          .catch(err => alert(err));
      });
  }
  async componentDidMount() {
    const permissionOK = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (!permissionOK) {
      var granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    }
    if (permissionOK || granted === PermissionsAndroid.RESULTS.GRANTED) {
      this.watchID = navigator.geolocation.watchPosition(
        position => {
          this.setState(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            () => {}
          );
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } else {
    }

    await Promise.all([this.getAges(), this.getNeeds()]).then(data => {});
  }
  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => {
            this.mapRef = ref;
          }}
          moveOnMarkerPress={true}
          showsUserLocation={true}
          style={styles.map}
          showUserLocation
          followUserLocation
          zoomEnabled
          loadingEnabled
          customMapStyle={mapStyle}
          provider={MapView.PROVIDER_GOOGLE}
          region={this.getMapRegion()}
        >
          {this.state.markers.map(x => {
            return (
              <Marker.Animated
                key={x.id}
                coordinate={{
                  latitude: Number(x.location.latitude),
                  longitude: Number(x.location.longitude)
                }}
                onPress={() => this._markerInfo(x.id)}
              >
                {/* <MapView.Callout
                  onPress={() => this._markerInfo(x.id)}
                  style={{
                    flex: 1,
                    position: "relative"
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        marginRight: 20,
                        marginLeft: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        elevation: 3
                      }}
                    >
                      <Icon
                        name="heart"
                        style={{
                          color: THEMECOLOR,
                          fontSize: 30
                        }}
                      ></Icon>
                    </View>
                    <View style={{ flexDirection: "column", marginRight: 10 }}>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                          Hay {x.qty} {x.qty > 1 ? "personas" : "persona"} que
                          podés ayudar!
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text>Para más info hace click aquí</Text>
                      </View>
                    </View>
                  </View>
                </MapView.Callout> */}
              </Marker.Animated>
            );
          })}
        </MapView>
        <View style={{ flex: 2, flexDirection: "column" }}>
          {!this.state.activePanel ? (
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{}}
              style={{ backgroundColor: THEMECOLOR }}
              onPress={() => this.setState({ active: !this.state.active })}
            >
              <Icon name="plus" />
              <Button
                style={{ backgroundColor: "#fff", borderColor: "#eee" }}
                onPress={() =>
                  this.props.navigation.navigate("NewPeopleScreen")
                }
              >
                <Icon name="adduser" size={18} style={{ color: "#000" }} />
              </Button>
              <Button
                style={{ backgroundColor: "#fff", borderColor: "#eee" }}
                onPress={() => this.props.navigation.navigate("NewPointScreen")}
              >
                <Icon name="pushpin" size={18} style={{ color: "#000" }} /> 
              </Button>
            </Fab>
          ) : (
            undefined
          )}
          <SlidingUpPanel
            onHideCallback={() =>
              this.setState({ activePanel: false, active: false })
            }
            ref={c => (this._panel = c)}
            backdropOpacity={1}
            draggableRange={{
              top: height - 200,
              bottom: 0
            }}
          >
            <View
              style={{
                position: "relative",
                flex: 2,
                backgroundColor: "white",
                borderColor: "#eee",
                borderWidth: 2,
                shadowRadius: 2,
                shadowOffset: {
                  width: 0,
                  height: -3
                },
                shadowColor: "#000000",
                elevation: 4
              }}
            >
              <Icon
                name="minus"
                style={{ alignSelf: "center", color: "#ccc", fontSize: 30 }}
              ></Icon>
              {this.state.activeMarker && (
                <PeopleView
                  data={this.state.activeMarker}
                  ages={this.state.ages}
                  needs={this.state.needs}
                  seen={this.seen}
                  notseen={this.notSeen}
                />
              )}
            </View>
          </SlidingUpPanel>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1
  }
});
