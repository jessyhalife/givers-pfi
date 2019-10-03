/* #region  IMPORTS */
import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Text } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import firebaseApp from "../../config";
import { THEMECOLOR, THEMECOLORLIGHT } from "../../const";
import Principal from "../new.people/Principal.js";
import Needs from "../new.people/Needs.js";
import Details from "../new.people/Details.js";
import Wizard from "react-native-wizard";
/* #endregion */
export default class NewPeople extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  /* #region  state */
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
    lastLong: null,
    isLastStep: false,
    isFirstStep: true,
    currentIndex: 0
  };
  /* #endregion */

  /* #region  functions */
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
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
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
  /* #endregion */
  handleChange(person) {
    console.log("llego");
    this.setState({ person }, () => {
      console.log(this.state.person);
    });
  }

  render() {
    const steps = [
      {
        component: () => (
          <Principal
            data={this.state.person}
            handleChange={this.handleChange}
          />
        )
      },
      {
        component: () => (
          <Needs data={this.state.person} handleChange={this.handleChange} />
        )
      },
      {
        component: () => (
          <Details data={this.state.person} handleChange={this.handleChange} />
        )
      }
    ];

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View>
            <Wizard
              ref={e => (this.wizard = e)}
              currentStep={(currentIndex, isFirstStep, isLastStep) => {
                this.setState({
                  isLastStep: isLastStep,
                  isFirstStep: isFirstStep,
                  currentIndex: currentIndex
                });
              }}
              steps={steps}
            />
          </View>
        </ScrollView>
        <View>
          <View>
            {this.state.isFirstStep ? (
              undefined
            ) : (
              <Button
                bordered
                light
                style={styles.button}
                onPress={() => {
                  this.wizard.prev();
                }}
              >
                <Text
                  style={{
                    color: THEMECOLOR,
                    alignItems: "center",
                    fontWeight: "bold"
                  }}
                >
                  VOLVER
                </Text>
              </Button>
            )}
          </View>
          <View>
            <Button
              style={styles.button}
              danger
              onPress={() => {
                this.wizard.next();
              }}
            >
              <Text
                style={{
                  color: "white",
                  alignItems: "center",
                  fontWeight: "bold"
                }}
              >
                {this.state.isLastStep ? "GUARDAR" : "SIGUIENTE"}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 60
  },
  nextButton: {}
});
