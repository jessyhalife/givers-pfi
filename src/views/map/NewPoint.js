import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Text, Icon } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { THEMECOLOR, THEMECOLORLIGHT } from "../../const";
import WhenComponent from "../crud/when.js";
import LocationComponent from "../crud/location.js";
import DetailsComponent from "../crud/details.js";
import NeedsComponent from "../crud/needs.js";
import PointTypeComponent from "../crud/point.type.js";
import MultiStep from "react-native-multistep-wizard";

class NewPoint extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Icon
          style={{ paddingLeft: 20 }}
          onPress={() => {
            if (navigation.state.currentIndex === 0) {
              navigation.goBack();
            } else {
              navigation.state.prev();
            }
          }}
          name="arrow-round-back"
          size={30}
        />
      )
    };
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
    this._submit = this._submit.bind(this);
  }
  state = {
    isLastStep: false,
    isFirstStep: true,
    currentIndex: 0,
    latitude: 0,
    longitude: 0,
    type: "",
    needs: [],
    details: ""
  };
  componentDidMount() {
    this.props.navigation.setParams({
      currentIndex: this.state.currentIndex,
      prev: this._prev
    });
  }

  handleChange(prop) {
    if (typeof prop == "object") {
      for (var p in prop) {
        this.setState({ [p]: prop[p] }, () => {});
      }
    } else {
      this.setState({ [prop]: prop });
    }
  }

  _next(prop) {
    this.handleChange(prop);
    this.wizard.next();
  }

  _prev(prop) {
    this.handleChange(prop);
    this.wizard.previous();
  }

  _submit(prop) {
    alert("Bye");
    var body = {
      people: {
        location: {
          latitude: this.state.latitude,
          longitude: this.state.longitude
        },
        qty: this.state.qty,
        needs: this.state.needs,
        ages: this.state.ages,
        details: this.state.details
      }
    };
    console.log(JSON.stringify(body));
    fetch("https://us-central1-givers-229af.cloudfunctions.net/webApi/people", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log("Error!!: ", error));

    this.props.navigation.goBack();
  }
  render() {
    const steps = [
      {
        name: "PointTypeStep",
        component: (
          <PointTypeComponent
            index={0}
            next={this._next}
            prev={() => {
              this.props.navigation.goBack();
            }}
          />
        )
      },
      {
        name: "LocationStep",
        component: (
          <LocationComponent
            index={1}
            showAnterior={true}
            next={this._next}
            location={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            prev={this._prev}
          />
        )
      },
      {
        name: "WhenStep",
        component: (
          <WhenComponent index={2} prev={this._prev} next={this._next} />
        )
      },
      {
        name: "NeedStep",
        component: (
          <NeedsComponent
            index={3}
            next={this._next}
            prev={this._prev}
            needs={this.state.needs}
            title="¿Cómo se puede colaborar?"
            event={true}
          />
        )
      }
    ];

    return (
      <View style={{ flex: 1 }}>
        <MultiStep
          ref={e => (this.wizard = e)}
          steps={steps}
          onFinish={this._submit}
        ></MultiStep>
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

export default NewPoint;
