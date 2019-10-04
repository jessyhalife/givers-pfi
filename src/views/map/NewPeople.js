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
    console.table(this.state);
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
    this.wizard.prev();
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
        component: () => (
          <LocationComponent
            next={this._next}
            location={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
          />
        )
      },
      {
        component: () => (
          <QtyComponent
            prev={this._prev}
            next={this._next}
            qty={this.state.qty}
            needs={this.state.needs}
          />
        )
      },
      {
        component: () => (
          <NeedsComponent
            next={this._next}
            prev={this._prev}
            needs={this.state.needs}
          />
        )
      },
      {
        component: () => (
          <DetailsComponent
            prev={this._prev}
            submit={this._submit}
            details={this.state.details}
          />
        )
      }
    ];
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
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
        </ScrollView>
        {/* <View>
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
        </View> */}
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
