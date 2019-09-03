import React, { Component } from "react";
import {
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import firebaseApp from "../../config";
import { THEMECOLOR, THEMECOLORLIGHT } from "../../const";
import Principal from "../new.people/Principal.js";
import Needs from "../new.people/Needs.js";
import Details from "../new.people/Details.js";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

export default class NewPeople extends Component {
  state = {
    error: false,
    formOK: false,
    loading: false,
    screenState: 1,
    person: {
      qty: 1,
      details: "",
      ages: [],
      needs: [],
      location: {}
    },
    mapRegion: null,
    lastLat: null,
    lastLong: null
  };

  _handleForward = () => {
    this.setState({ screenState: this.state.screenState + 1 });
  };
  _handleBackward = () => {
    this.setState({ screenState: this.state.screenState - 1 });
  };
  firstStep = params => {
    let { person } = this.state;
    person.qty = params.qty;
    person.ages = params.ages;
    person.location = params.location;
    this.setState({ person: person });
  };
  secondStep = () => {};
  handleSave = () => {};
  watchID = null;
  componentDidMount() {
    this.watchID = navigator.geolocation.getCurrentPosition(
      position => {
        // Create the object to update this.state.mapRegion through the onRegionChange function
        this.setState(
          prevState => ({
            person: {
              ...prevState.person,
              location: position.coords
            }
          }),
          () => {
            console.log(this.state.person);
          }
        );
      },
      error => console.log(error)
    );
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  render() {
    console.log("wtf");
    const progressStepsStyle = {
      activeStepIconBorderColor: THEMECOLORLIGHT,
      activeLabelColor: THEMECOLORLIGHT,
      activeStepNumColor: "white",
      activeStepIconColor: THEMECOLORLIGHT,
      completedStepIconColor: THEMECOLOR,
      completedProgressBarColor: THEMECOLOR,
      completedCheckColor: "white",
      borderWidth: 2
    };

    return (
      <View style={{ flex: 1 }}>
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
            label=""
            nextBtnStyle={styles.nextBtnStyle}
            nextBtnIcon="arrow-forward"
          >
            <View>
              <Principal data={this.state.person} />
            </View>
          </ProgressStep>
          <ProgressStep
            label=""
            nextBtnIcon="arrow-forward"
            nextBtnStyle={styles.nextBtnStyle}
          >
            <View>
              <Needs data={this.state.person} />
            </View>
          </ProgressStep>
          <ProgressStep label="">
            <View>
              <Details data={this.state.person} />
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nextBtnStyle: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEMECOLOR,
    borderRadius: 50,
    width: 50,
    height: 50
  }
});
