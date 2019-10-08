import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Text, Icon } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { THEMECOLOR, THEMECOLORLIGHT } from "../../const";
import QtyComponent from "../crud/qty.js";
import LocationComponent from "../crud/location.js";
import DetailsComponent from "../crud/details.js";
import NeedsComponent from "../crud/needs.js";
import Wizard from "react-native-wizard";
import MultiStep from "react-native-multistep-wizard";

class NewPeople extends Component {
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
    ages: [],
    needs: [],
    qty: "",
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
        name: "LocationStep",
        component: (
          <LocationComponent
            index={0}
            showAnterior={false}
            next={this._next}
            location={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            prev={() => {
              this.props.navigation.goBack();
            }}
          />
        )
      },
      {
        name: "QtyStep",
        component: (
          <QtyComponent
            index={1}
            prev={this._prev}
            next={this._next}
            qty={this.state.qty}
            needs={this.state.needs}
          />
        )
      },
      {
        name: "NeedStep",
        component: (
          <NeedsComponent
            index={2}
            next={this._next}
            prev={this._prev}
            event={false}
            needs={this.state.needs}
            title="¿Necesitan algo en particular?"
          />
        )
      },
      {
        name: "DetailStep",
        component: (
          <DetailsComponent
            index={3}
            prev={this._prev}
            submit={this._submit}
            details={this.state.details}
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

export default NewPeople;
