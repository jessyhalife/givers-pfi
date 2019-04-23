import React, { Component } from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import MapView, { Marker} from 'react-native-maps';

export default class MapGiver extends Component {
    
    state = {
        latitude: 37.421,
        longitude:-122.083,
        locationPermission: true
      };

      componentDidMount() {
        if (this.state.locationPermission){
        this.watchID = navigator.geolocation.watchPosition(
          position => {
            
             this.setState({
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
             });
             console.log(this.state.latitude);
             console.log(this.state.longitude);
           },
           error => console.log(error),
           { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );}
      }
      getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta:  0.0421
      });
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    render(){
        return (
            <View style={styles.container}>
              <MapView
                showsUserLocation={true}
                style={styles.map}
                showUserLocation
                followUserLocation
                loadingEnabled
                region={this.getMapRegion()}
              >
              </MapView>
            </View>
          );
        }
      }
       
      const styles = StyleSheet.create({
        container: {
          flexDirection: 'row',
          position:'absolute',
          top:0,
          left:0,
          right:0,
          bottom:0,
          alignItems: 'center',
        },
        map: {
          ...StyleSheet.absoluteFillObject,
        },
      });