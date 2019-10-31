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
import { THEMECOLOR, BASEURL } from "../const";
const { height, width } = Dimensions.get("window");
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
import { PermissionsAndroid } from "react-native";
import { Fab, Button, Root, Spinner } from "native-base";
import SlidingUpPanel from "rn-sliding-up-panel";
import PeopleView from "./PeopleView";
import EventView from "./EventView";
import PointView from "./PointView";
import Geocoder from "react-native-geocoding";
import mapStyle from "../assets/mapStyle";
import Icon from "react-native-vector-icons/AntDesign";
import Search from "../components/Search";
import HelpModal from "../components/HelpModal.js";
import firebaseApp from "../config/config";
import Modal from "react-native-modal";
import pointService from "../services/point";

Geocoder.init("AIzaSyBZac8n4qvU063aXqkGnYshZX3OQcBJwJc");

export default class MapGiver extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return params;
  };
  constructor(props) {
    super(props);
    this.state = {
      real_markers: [],
      real_events: [],
      real_points: [],
      markers: [],
      evMarkers: [],
      poMarkers: [],
      latitude: -34.6037389,
      longitude: -58.3815704,
      active: false,
      activeMarker: null,
      activeMarkerEvent: null,
      activeMarkerPoint: null,
      ages: [],
      needs: [],
      activePanel: false,
      showToast: false,
      open: false,
      idToken: "",
      loading: false,
      helpModal: false,
      selected_id: "",
      users: [],
      clickPanel: "",
      contacts: []
    };
    this.mapRef = null;
    this.getAges = this.getAges.bind(this);
    this.getContacts = this.getContacts.bind(this);
    this.getNeeds = this.getNeeds.bind(this);
    this.filter = this.filter.bind(this);
    this.setMapRegion = this.setMapRegion.bind(this);
    this.giveHelp = this.giveHelp.bind(this);
    this.saveHelp = this.saveHelp.bind(this);
    this.asistire = this.asistire.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState(
      {
        markers: props.people,
        real_events: props.events,
        real_people: props.people,
        evMarkers: props.events,
        real_points: props.points,
        poMarkers: props.points
      },
      () => {}
    );
  }
  asistire = id => {
    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/events/attending/${id}`,
      {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: this.state.idToken
        })
      }
    )
      .then(res => {
        let last = this.state.activeMarkerEvent;

        if (last.attendees.indexOf(firebaseApp.auth().currentUser.uid) <= -1) {
          last.data.attendees.push(firebaseApp.auth().currentUser.uid);
          this.setState({ activeMarkerEvent: last });
        }
        return res.response.status;
      })
      .catch(error => {
        console.log("Error: ", error);
        return res.response.status;
      });
  };
  seen = id => {
    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/seen/${id}`,
      {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: this.state.idToken
        })
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
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: this.state.idToken
        })
      }
    )
      .then(res => this._markerInfo(id))
      .catch(error => console.log("Error!!: ", error));
  };
  async getContacts() {
    fetch(
      "https://us-central1-givers-229af.cloudfunctions.net/webApi/points/contacts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.state.idToken
        }
      }
    )
      .then(response => response.json())
      .then(json => {
        this.setState({ contacts: json }, () => {
          return;
        });
      })
      .catch(error => {
        throw error;
      });
  }
  getAges() {
    fetch(`https://us-central1-givers-229af.cloudfunctions.net/webApi/ages`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: this.state.idToken
      })
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ ages: json });
        return;
      })
      .catch(error => {
        console.log(error);
      });
  }
  getNeeds() {
    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/helptypes`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: this.state.idToken
        })
      }
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ needs: json });
        return;
      })
      .catch(error => {});
  }
  saveHelp() {
    this.seen(this.state.selected_id);
    this.props.navigation.goBack();
  }
  giveHelp() {
    this.props.navigation.navigate("HelpScreen", {
      people_id: this.state.selected_id,
      needs: this.state.needs
    });
    //this.setState({ helpModal: true });
  }
  _markerInfo(key) {
    this.setState({ selected_id: key });

    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/${key}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: this.state.idToken
        })
      }
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
            pers.loadingHelp = true;
            this.setState({ activeMarker: pers }, () => {
              this._panel.show(350, 0);
              this.setState({ activePanel: true });
            });
            this.setState(
              {
                latitude: pers.location.latitude,
                longitude: pers.location.longitude
              },
              () => {
                this.mapRef.animateToRegion(this.getMapRegion(), 1);
                this.getHelpToPeople(key, this.state.idToken);
              }
            );
          })
          .catch(err => alert(err));
      });
  }

  _pointInfo(x) {
    this.setState({ selected_id: x.Id });
    var point = x;
    Geocoder.from({
      latitude: point.data.location.latitude,
      longitude: point.data.location.longitude
    })
      .then(add => {
        point.address = add.results[0].formatted_address;
        point.loadingHelp = true;
        this.setState({ activeMarkerPoint: point }, () => {
          this._panel.show(300, 0);

          this.setState({ activePanel: true });
        });
        this.setState(
          {
            latitude: point.data.location.latitude,
            longitude: point.data.location.longitude
          },
          () => {
            this.mapRef.animateToRegion(this.getMapRegion(), 1);
          }
        );
      })
      .catch(err => alert(err));
  }

  _eventInfo(x) {
    this.setState({ selected_id: x.Id });
    var event = x;
    Geocoder.from({
      latitude: event.data.location.latitude,
      longitude: event.data.location.longitude
    })
      .then(add => {
        event.address = add.results[0].formatted_address;
        event.loadingHelp = true;
        this.setState({ activeMarkerEvent: event }, () => {
          this._panel.show(300, 0);
          this.setState({ activePanel: true });
        });
        this.setState(
          {
            latitude: event.data.location.latitude,
            longitude: event.data.location.longitude
          },
          () => {
            this.mapRef.animateToRegion(this.getMapRegion(), 1);
          }
        );
      })
      .catch(err => alert(err));
  }
  getHelpToPeople = (people_id, idToken) => {
    fetch(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/people/${people_id}/help`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: idToken
        })
      }
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        let prev = this.state.activeMarker;
        prev.loadingHelp = false;
        prev.help = json;
        this.setState({
          activeMarker: prev
        });
      })
      .catch(error => {
        let prev = this.state.activeMarker;
        prev.loadingHelp = false;
        prev.help = [];
        this.setState({
          activeMarker: prev
        });
      });
  };
  async componentDidMount() {
    this.setState({ loading: true });
    const permissionOK = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (!permissionOK) {
      var granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    }
    if (permissionOK || granted === PermissionsAndroid.RESULTS.GRANTED) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            () => {
              // this.mapRef.animateToRegion(this.getMapRegion(), 200);
            }
          );
        },
        error => console.log(error),
        { enableHighAccuracy: false, timeout: 50000 }
      );
    }
    firebaseApp
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        this.setState({ idToken }, () => {
          Promise.all([this.getAges(), this.getNeeds(), this.getContacts()])
            .then(data => {
              this.setState({ loading: false });
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
  }
  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });
  componentWillUnmount() {
    // navigator.geolocation.clearWatch(this.watchID);
  }

  setMapRegion = location => {
    this.setState(
      {
        latitude: location.lat,
        longitude: location.lng
      },
      () => {
        // this.mapRef.animateToRegion(this.getMapRegion());
      }
    );
  };

  filter = (markers, evMarkers) => {
    this.setState({
      markers: markers ? markers : [],
      evMarkers: evMarkers ? evMarkers : []
    });
  };

  render() {
    return (
      <Root>
        <Search
          navigation={this.props.navigation}
          filtrar={this.filter}
          needs={this.state.needs}
          ages={this.state.ages}
          ç
          people={this.state.real_people}
          events={this.state.real_events}
          setMapRegion={this.setMapRegion}
        ></Search>
        <View style={styles.container}>
          <MapView
            ref={ref => {
              this.mapRef = ref;
            }}
            // onRegionChangeComplete={data => {
            //   console.log(data);
            //   this.setState({
            //     latitude: data.latitude,
            //     longitude: data.longitude,
            //     LATITUDE_DELTA: data.latitude_delta,
            //     LONGITUDE_DELTA: data.longitude_delta
            //   });
            //   // this.mapRef.animateToRegion(this.getMapRegion(), 200);
            // }}
            moveOnMarkerPress={true}
            showsUserLocation={true}
            style={styles.map}
            followUserLocation
            zoomEnabled={true}
            showsMyLocationButton={true}
            loadingEnabled={false}
            customMapStyle={mapStyle}
            provider={MapView.PROVIDER_GOOGLE}
            // initialRegion={this.getMapRegion()}
            region={this.getMapRegion()}
          >
            {this.state.markers &&
              this.state.markers.map(x => {
                return (
                  <Marker.Animated
                    key={x.id}
                    coordinate={{
                      latitude: Number(x.location.latitude),
                      longitude: Number(x.location.longitude)
                    }}
                    onPress={() => {
                      this.setState({ clickPanel: "P" }, () => {
                        this._markerInfo(x.id);
                      });
                    }}
                  ></Marker.Animated>
                );
              })}
            {this.state.evMarkers &&
              this.state.evMarkers.map(x => {
                return (
                  <Marker.Animated
                    key={x.id}
                    coordinate={{
                      latitude: Number(x.data.location.latitude),
                      longitude: Number(x.data.location.longitude)
                    }}
                    pinColor="#0083ff"
                    onPress={() => {
                      this.setState({ clickPanel: "E" }, () => {
                        this._eventInfo(x);
                      });
                    }}
                  ></Marker.Animated>
                );
              })}
            {this.state.poMarkers &&
              this.state.poMarkers.map(x => {
                return (
                  <Marker.Animated
                    key={x.id}
                    coordinate={{
                      latitude: Number(x.data.location.latitude),
                      longitude: Number(x.data.location.longitude)
                    }}
                    pinColor="#ffeb00"
                    onPress={() => {
                      this.setState({ clickPanel: "H" }, () => {
                        this._pointInfo(x);
                      });
                    }}
                  ></Marker.Animated>
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
                    this.props.navigation.navigate("NewPeopleScreen", {
                      needs: this.state.needs,
                      ages: this.state.ages
                    })
                  }
                >
                  <Icon name="adduser" size={20} style={{ color: "#000" }} />
                </Button>
                <Button
                  style={{
                    backgroundColor: "#fff",
                    borderColor: "#eee"
                  }}
                  onPress={() =>
                    this.props.navigation.navigate("NewPointScreen", {
                      needs: this.state.needs
                    })
                  }
                >
                  <Icon name="pushpin" size={20} style={{ color: "#000" }} />
                </Button>
              </Fab>
            ) : (
              undefined
            )}
            <SlidingUpPanel
              onHideCallback={() =>
                this.setState({
                  activePanel: false,
                  activeMarker: undefined,
                  active: false
                })
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
                  style={{
                    alignSelf: "center",
                    color: "#ccc",
                    fontSize: 30
                  }}
                ></Icon>
                {this.state.clickPanel == "P"
                  ? this.state.activeMarker && (
                      <PeopleView
                        giveHelp={this.giveHelp}
                        saveHelp={this.saveHelp}
                        data={this.state.activeMarker}
                        help={undefined}
                        loadingHelp={true}
                        ages={this.state.ages}
                        needs={this.state.needs}
                        seen={this.seen}
                        notseen={this.notSeen}
                      />
                    )
                  : this.state.clickPanel == "E"
                  ? this.state.activeMarkerEvent && (
                      <EventView
                        data={this.state.activeMarkerEvent}
                        loadingHelp={true}
                        asistire={this.asistire}
                        needs={this.state.needs}
                        uid={firebaseApp.auth().currentUser.uid}
                      />
                    )
                  : this.state.activeMarkerPoint && (
                      <PointView
                        data={this.state.activeMarkerPoint}
                        needs={this.state.needs}
                        uid={firebaseApp.auth().currentUser.uid}
                        contacts={this.state.contacts}
                      ></PointView>
                    )}
              </View>
            </SlidingUpPanel>
          </View>
        </View>
        <Modal
          backdropOpacity={0.3}
          isVisible={this.state.loading}
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
              <Text>Cargando..</Text>
              <Spinner color={THEMECOLOR}></Spinner>
            </View>
          </View>
        </Modal>
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
