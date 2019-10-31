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
import InfoComponent from "../crud/point.info";
import TimeComponent from "../crud/point.time.contact";
import ContactComponent from "../crud/contacts.js";
import MultiStep from "react-native-multistep-wizard";
import firebaseApp from "../../config/config";

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
    details: "",
    title: "",
    description: "",
    dateStart: new Date(),
    dateEnd: new Date(),
    timeStart: "00:00",
    timeEnd: "00:00",
    pointType: "E",
    days: [],
    contacts: []
  };
  componentWillMount() {
    if (this.props.navigation.state.params.type)
      this.setState({ pointType: this.props.navigation.state.params.type });
  }
  componentDidMount() {
    this.props.navigation.setParams({
      currentIndex: this.state.currentIndex,
      prev: this._prev
    });
  }

  handleChange(prop) {
    console.log(prop);
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
    var body = {};
    if (this.state.pointType == "E") {
      body = {
        event: {
          location: {
            latitude: this.state.latitude,
            longitude: this.state.longitude
          },
          title: this.state.title,
          description: this.state.description,
          needs: prop.needs,
          type: this.state.type,
          startDate: this.state.dateStart,
          endDate: this.state.dateEnd,
          startTime: this.state.timeStart,
          endTime: this.state.timeEnd
        }
      };
    } else {
      console.log(this.state.days.length);
      body = {
        point: {
          location: {
            latitude: this.state.latitude,
            longitude: this.state.longitude
          },
          title: this.state.title,
          description: this.state.description,
          needs: prop.needs,
          type: this.state.type,
          startTime: this.state.timeStart,
          endTime: this.state.timeEnd,
          contacts: prop.contacts,
          days:
            this.state.days.length == 1
              ? this.state.days.day
              : this.state.days.map(x => x.day)
        }
      };
    }
    console.log(
      `https://us-central1-givers-229af.cloudfunctions.net/webApi/${
        this.state.pointType == "E" ? "events" : "points"
      }/`
    );
    console.log(JSON.stringify(body));
    firebaseApp
      .auth()
      .currentUser.getIdToken(false)
      .then(idToken => {
        console.log(idToken);
        fetch(
          `https://us-central1-givers-229af.cloudfunctions.net/webApi/${
            this.state.pointType == "E" ? "events" : "points"
          }/`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
              Authorization: idToken
            }
          }
        )
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(error => console.log("Error!!: ", error));

        this.props.navigation.navigate("MapScreen");
      })
      .catch(err => {
        alert(err);
        this.props.navigation.navigate("MapScreen");
      });
  }
  render() {
    const stepsPoints = [
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
            prev={() => {
              this.props.navigation.goBack();
            }}
          />
        )
      },
      {
        name: "InfoStep",
        component: (
          <InfoComponent next={this._next} prev={this._prev}></InfoComponent>
        )
      },
      {
        name: "NeedStep",
        component: (
          <NeedsComponent
            index={3}
            next={this._next}
            needs={this.props.navigation.state.params.needs}
            title="¿Cómo se puede colaborar?"
            event={false}
            prev={this._prev}
          />
        )
      },
      {
        name: "TimeStep",
        component: (
          <TimeComponent next={this._next} prev={this._prev}></TimeComponent>
        )
      },
      {
        name: "ContactStep",
        component: (
          <ContactComponent
            next={this._submit}
            prev={this._prev}
          ></ContactComponent>
        )
      }
    ];
    const steps = [
      // {
      //   name: "PointTypeStep",
      //   component: (
      //     <PointTypeComponent
      //       setType={val => {
      //         this.setState({ pointType: val });
      //       }}
      //       navigation={this.props.navigation}
      //       index={0}
      //       next={this._next}
      //       prev={() => {
      //         this.props.navigation.goBack();
      //       }}
      //     />
      //   )
      // },
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
            prev={() => {
              this.props.navigation.goBack();
            }}
            // prev={this._prev}
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
            next={this._submit}
            prev={this._prev}
            needs={this.props.navigation.state.params.needs}
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
          steps={this.state.pointType == "E" ? steps : stepsPoints}
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
  }
});

export default NewPoint;
