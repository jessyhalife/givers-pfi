import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import {
  Text,
  Button,
  Switch,
  ListItem,
  CheckBox,
  Separator
} from "native-base";
import { THEMECOLOR, THEMECOLORLIGHT } from "../const.js";
import Icon from "react-native-vector-icons/AntDesign";

export default class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      filters: 0,
      needs: [],
      ages: [],
      showNeeds: false,
      showAges: false,
      types: {
        personas: true,
        eventos: true,
        points: true
      }
    };
    this.filtrar = this.filtrar.bind(this);
    this.changeNeed = this.changeNeed.bind(this);
  }
  componentDidMount() {
    var { showNeeds, types, showAges } = this.props.navigation.state.params;
    //TODO: load needs and ages
    this.setState({ showNeeds, showAges, types });
  }
  filtrar = () => {
    var { people, events } = this.props.navigation.state.params;

    if (!this.state.types.personas) {
      people = [];
    } else {
      if (this.state.needs.length > 0) {
        people = people.filter(x => {
          return this._containsAll(x.needs, this.state.needs);
        });
      }
    }
    if (!this.state.types.eventos) {
      events = [];
    } else {
      if (this.state.needs.length > 0) {
        events = events.filter(x => {
          return this._containsAll(x.data.needs, this.state.needs);
        });
      }
    }
    this.props.navigation.state.params.filter(people, events, {
      showNeeds: this.state.showNeeds,
      showAges: this.state.showAges,
      types: this.state.types,
      needs: this.state.needs,
      ages: this.state.ages
    });
    this.props.navigation.goBack();
  };
  changeNeed(id) {
    let prev = this.state.needs ? this.state.needs : [];

    if (!prev.some(x => x === id)) {
      prev.push(id);
    } else {
      prev = prev.filter(x => x !== id);
    }

    this.setState({ needs: prev });
  }
  _containsAll(array, array2) {
    var exists = true;
    if (array === undefined) {
      exists = false;
    } else {
      array2.forEach(x => {
        if (array.indexOf(x) < 0) {
          exists = false;
        }
      });
    }
    return exists;
  }

  render() {
    console.table(props);
    return (
      <View>
        <View
          style={{
            margin: 10,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#fdfdfd",
              borderRadius: 50,
              padding: 10
            }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={{ fontWeight: "bold", color: "gray" }}>ATRÁS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#fdfdfd",
              borderRadius: 50,
              padding: 10
            }}
            onPress={() => {
              this.filtrar();
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#3175f6" }}>
              FILTRAR
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ elevation: 4 }}>
            <View
              style={{
                flexDirection: "column",
                backgroundColor: "white"
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  marginLeft: 20,
                  marginRight: 20
                }}
              >
                Filtrar por:
              </Text>

              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 20
                }}
              >
                <Text>Personas</Text>
                <Switch
                  trackColor={{ true: THEMECOLORLIGHT }}
                  thumbColor={THEMECOLOR}
                  onValueChange={() =>
                    this.setState({
                      types: {
                        ...this.state.types,
                        personas: !this.state.types.personas
                      }
                    })
                  }
                  value={this.state.types.personas}
                ></Switch>
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 20
                }}
              >
                <Text>Eventos</Text>
                <Switch
                  trackColor={{ true: THEMECOLORLIGHT }}
                  thumbColor={THEMECOLOR}
                  onValueChange={() =>
                    this.setState({
                      types: {
                        ...this.state.types,
                        eventos: !this.state.types.eventos
                      }
                    })
                  }
                  value={this.state.types.eventos}
                ></Switch>
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginLeft: 20,
                  marginRight: 20
                }}
              >
                <Text>Puntos de ayuda</Text>
                <Switch
                  trackColor={{ true: THEMECOLORLIGHT }}
                  thumbColor={THEMECOLOR}
                  onValueChange={() =>
                    this.setState({
                      types: {
                        ...this.state.types,
                        points: !this.state.types.points
                      }
                    })
                  }
                  value={this.state.types.points}
                ></Switch>
              </View>
              <Separator
                style={{ marginTop: 10, marginBottom: 10 }}
                bordered
              ></Separator>
              <View
                style={
                  (this.state.showNeeds ? { height: 300 } : { undefined },
                  { marginLeft: 20, marginRight: 10 })
                }
              >
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    this.setState({ showNeeds: !this.state.showNeeds })
                  }
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      marginRight: 10
                    }}
                  >
                    Tipo de ayuda
                  </Text>
                  <Icon style={{ alignSelf: "center" }} name="arrowdown"></Icon>
                </TouchableOpacity>
                {this.state.showNeeds ? (
                  <ScrollView style={{ marginTop: 10 }}>
                    {this.props.navigation.state.params.needs.map(n => {
                      return (
                        <ListItem last key={n.id}>
                          <CheckBox
                            onPress={() => {
                              this.changeNeed(n.id);
                            }}
                            checked={
                              this.state.needs.filter(x => x === n.id).length ==
                              1
                            }
                            style={{ marginRight: 10 }}
                          ></CheckBox>
                          <Text style={{ marginLeft: 10 }}>
                            {n.data.description}
                          </Text>
                        </ListItem>
                      );
                    })}
                  </ScrollView>
                ) : (
                  undefined
                )}
              </View>
              <Separator
                style={{ marginTop: 10, marginBottom: 10 }}
                bordered
              ></Separator>
              <View
                style={
                  (this.state.showAges ? { height: 300 } : { undefined },
                  { marginLeft: 20, marginRight: 10 })
                }
              >
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    this.setState({ showAges: !this.state.showAges })
                  }
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      marginRight: 10
                    }}
                  >
                    Edades
                  </Text>
                  <Icon style={{ alignSelf: "center" }} name="arrowdown"></Icon>
                </TouchableOpacity>
                {this.state.showAges ? (
                  <ScrollView style={{ marginTop: 10 }}>
                    {this.props.navigation.state.params.ages.map(n => {
                      return (
                        <ListItem last key={n.id}>
                          <CheckBox
                            onPress={() => {
                              this.changeNeed(n.id);
                            }}
                            checked={
                              this.state.ages.filter(x => x === n.id).length ==
                              1
                            }
                            style={{ marginRight: 10 }}
                          ></CheckBox>
                          <Text style={{ marginLeft: 10 }}>
                            {n.data.description}
                          </Text>
                        </ListItem>
                      );
                    })}
                  </ScrollView>
                ) : (
                  undefined
                )}
              </View>
            </View>

            <View style={{ textAlign: "center", marginTop: 20 }}>
              <Button
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: THEMECOLOR,
                  width: "100%"
                }}
                onPress={() => {
                  this.filtrar();
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Aplicar
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
