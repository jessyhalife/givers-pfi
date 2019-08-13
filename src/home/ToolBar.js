import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Icon, Text } from "react-native-elements";
import firebaseApp from '../config';
export default class ToolBar extends Component {
  constructor(props) {
    super(props);
  }
  _signOut() {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Main");
      })
      .catch(error => {
        console.log(error);
      });
  }
  async _testAPI()  {
    console.log('entrar, entra');
    fetch('http://localhost/people/test', 
    {method: 'GET', })
      .then(response => response.json())
      .then(responseJSON => console.log(responseJSON))
      .catch(err => console.log(err));

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.text}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={styles.buttonBar}>
              <TouchableOpacity style={styles.button}>
                <Icon
                  raised
                  name="location-on"
                  type="material"
                  color="black"
                  underlayColor="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate("NewPlace");
                }}
              >
                <Icon
                  raised
                  name="location-on"
                  type="material"
                  color="red"
                  underlayColor="white"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={this._testAPI}>
                <Icon
                  raised
                  name="report-problem"
                  type="material"
                  color="blue"
                  underlayColor="white"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Icon
                  raised
                  name="close"
                  type="material"
                  color="black"
                  underlayColor="white"
                  onPress={this._signOut}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: "column"
  },
  text: {
    flex: 1,
    borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5
  },
  buttonBar: {
    flexDirection: "row"
    // position: "absolute",
    // bottom: 0
  },
  button: {
    paddingLeft: 10,
    paddingRight: 25
  }
});
