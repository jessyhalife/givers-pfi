import React, { Component } from "react";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createTabNavigator
} from "react-navigation";
//import Login from "./src/login/components/Login";
import Login from "./src/views/Login";
//import Main from "./src/main/components/Main";
import Main from "./src/views/Main";
import Welcome from "./src/main/components/Welcome";
//import Home from "./src/home/components/Home";
import Home from "./src/views/map/Index"
//import Register from "./src/register/components/Register";
import Register from "./src/views/Register";
import NewPeople from "./src/views/map/NewPeople";

const AppNavigator = createStackNavigator(
  {
    NewPeople: { screen: NewPeople },
    Welcome: { screen: Welcome },
    Main: { screen: Main },
    Register: { screen: Register },
    Login: { screen: Login },
    Home: { screen: Home },
  },
  {}
);

console.disableYellowBox = true;
const AppContainer = createAppContainer(AppNavigator);
export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
