import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableHighlight,
  Dimensions
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { THEMECOLOR } from "../const";
const { height, width } = Dimensions.get("window");
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
import { PermissionsAndroid } from "react-native";
import { Fab, Icon, Container, Button } from "native-base";
import SlidingUpPanel from "rn-sliding-up-panel";
import PeopleView from "./PeopleView";

export default class MapGiver extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      latitude: 37.421,
      longitude: -122.083,
      locationPermission: true,
      active: false,
      activeMarker: null
    };
    this.mapRef = null;
  }
  componentWillReceiveProps(props) {
    console.log(props.people);
    this.setState({ markers: props.people }, () => {});
  }
  _markerInfo(key) {
    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/${key}`
    )
      .then(response => response.json())
      .then(json => {
        this.setState({ activeMarker: json }, () => {
          this._panel.show(150, 5);
        });
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
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: THEMECOLOR, position: "absolute" }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}
        >
          <Icon name="add" />
          <Button
            style={{ backgroundColor: "#fff", borderColor: "#eee" }}
            onPress={() => this.props.navigation.navigate("NewPeopleScreen")}
          >
            <Icon name="person-add" style={{ color: "#000" }} />
          </Button>
          <Button
            style={{ backgroundColor: "#fff", borderColor: "#eee" }}
            onPress={() => this.props.navigation.navigate("NewPointScreen")}
          >
            <Icon name="pin" style={{ color: "#000" }} />
          </Button>
        </Fab>
        <View style={{ flex: 2 }}>
          <SlidingUpPanel
            ref={c => (this._panel = c)}
            backdropOpacity={1}
            draggableRange={{
              top: height - 120,
              bottom: 0
            }}
            // onHideCallback={() => {
            //   this.setState({ activeMarker: null }, () => {
            //     console.log("borro");
            //   });
            // }}
          >
            <View
              style={{
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
                name="remove"
                style={{ alignSelf: "center", color: "#eee" }}
              ></Icon>
              {this.state.activeMarker && (
                <PeopleView data={this.state.activeMarker} />
              )}
            </View>
          </SlidingUpPanel>
        </View>
        <MapView
          ref={ref => {
            this.mapRef = ref;
          }}
          showsUserLocation={true}
          style={styles.map}
          showUserLocation
          followUserLocation
          zoomEnabled
          loadingEnabled
          region={this.getMapRegion()}
        >
          {this.state.markers.map(x => {
            return (
              <Marker
                key={x.id}
                coordinate={{
                  latitude: Number(x.location.latitude),
                  longitude: Number(x.location.longitude)
                }}
                onPress={() => this._markerInfo(x.id)}
              ></Marker>
            );
          })}
        </MapView>
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
