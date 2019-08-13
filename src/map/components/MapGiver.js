import React, { PureComponent } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { THEMECOLOR } from "../../const";
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
import { PermissionsAndroid } from "react-native";
import { Fab, Icon, Container, Button } from "native-base";
export default class MapGiver extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      latitude: 37.421,
      longitude: -122.083,
      locationPermission: true,
      active: false
    };
    this.mapRef = null;
  }
  componentWillReceiveProps(props) {
    this.setState({ markers: props.people }, () => {
      console.log(this.state.markers);
    });
  }
  componentDidMount() {
    if (this.state.locationPermission) {
      this.watchID = navigator.geolocation.watchPosition(
        position => {
          this.setState(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            () => {
              console.log(this.state.latitude);
            }
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
          <Button style={{ backgroundColor: "#34A34F" }}>
            <Icon name="person-add" />
          </Button>
          <Button style={{ backgroundColor: "#3B5998" }}>
            <Icon name="hand" />
          </Button>
        </Fab>
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
          {this.state.markers.map((x, i) => {
            console.log(x);
            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: Number(x.latitude),
                  longitude: Number(x.longitude)
                }}
              />
            );
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  }
});
