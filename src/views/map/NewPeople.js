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
import {
  Container,
  Form,
  Item,
  Input,
  Label,
  Content,
  Header,
  H1,
  Text,
  Icon,
  Button,
  Badge,
  Textarea
} from "native-base";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

export default class NewPeople extends Component {
  state = {
    error: false,
    formOK: false,
    loading: false,
    screenState: 1
  };

  _handleForward = () => {
    this.setState({ screenState: this.state.screenState + 1 });
  };
  _handleBackward = () => {
    this.setState({ screenState: this.state.screenState - 1 });
  };
  handleSave = () => {};

  componentWillUnmount() {}

  render() {
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
              <Principal />
            </View>
          </ProgressStep>
          <ProgressStep
            label=""
            nextBtnIcon="arrow-forward"
            nextBtnStyle={styles.nextBtnStyle}
          >
            <View>
              <Needs />
            </View>
          </ProgressStep>
          <ProgressStep label="">
            <View>
              <Details />
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
