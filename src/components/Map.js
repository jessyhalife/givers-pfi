import React, { Component } from "react";
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
import { Fab, Container, Button, Root, Toast, Header, Body } from "native-base";
import SlidingUpPanel from "rn-sliding-up-panel";
import PeopleView from "./PeopleView";
import Geocoder from "react-native-geocoding";
import mapStyle from "../assets/mapStyle";
import Icon from "react-native-vector-icons/AntDesign";
import Search from "../components/Search";

Geocoder.init("AIzaSyBZac8n4qvU063aXqkGnYshZX3OQcBJwJc");

export default class MapGiver extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    console.log("paramsposta");
    console.log(params);
    return params;
  };
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      evMarkers: [],
      latitude: 37.421,
      longitude: -122.083,
      locationPermission: true,
      active: false,
      activeMarker: null,
      ages: [],
      needs: [],
      activePanel: false,
      showToast: false,
      open: false
    };
    this.mapRef = null;
    this.getAges = this.getAges.bind(this);
    this.getNeeds = this.getNeeds.bind(this);
  }
  componentWillReceiveProps(props) {
    this.setState({ markers: props.people, evMarkers: props.events }, () => {});

    console.log(this.props.navigation.state.params);
    if (this.props.navigation.getParam("toast", false)) {
      console.log("hay algo");
      Toast.show({
        text: this.props.navigation.state.params.toastMessage,
        buttonText: "Okey",
        duration: 6000,
        position: "top",
        type: "success",
        textStyle: { fontSize: 18 }
      });
    }
  }

  seen = id => {
    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/seen/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(res => this._markerInfo(id))
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
            () => {
              this.mapRef.animateToRegion(this.getMapRegion(), 200);
            }
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
      <Root>
        <Search needs={this.state.needs} ages={this.state.ages}></Search>
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
                ></Marker.Animated>
              );
            })}
            {this.state.evMarkers.map(x => {
              return (
                <Marker.Animated
                  key={x.id}
                  coordinate={{
                    latitude: Number(x.data.location.latitude),
                    longitude: Number(x.data.location.longitude)
                  }}
                  pinColor="green"
                  title={x.data.title}
                  description={x.data.description}
                ></Marker.Animated>
              );
            })}
          </MapView>
          <View style={{ flex: 2, flexDirection: "column" }}>
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
      </Root>
    );
  }
}
const actions = [
  {
    text: "Accessibility",
    name: "plus",
    position: 1
  }
];
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  },
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
