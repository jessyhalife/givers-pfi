import React, { Component } from "react";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  createTabNavigator
} from "react-navigation";
//import Login from "./src/login/components/Login";
import Login from "./src/views/Login";
//import Main from "./src/main/components/Main";
import Main from "./src/views/Main";
import Welcome from "./src/main/components/Welcome";
//import Home from "./src/home/components/Home";
import MapScreen from "./src/views/map/Index";
//import Register from "./src/register/components/Register";
import Register from "./src/views/Register";
import NewPeople from "./src/views/map/NewPeople";
import Activity from "./src/views/Activity";
import { Icon } from "native-base";

const MapStackNavigator = createStackNavigator(
  {
    MapScreen: { screen: MapScreen },
    NewPeopleScreen: { screen: NewPeople }
  },
  {}
);
const MapTabNavigator = createBottomTabNavigator(
  {
    Explore: {screen: MapStackNavigator,
      navigationOptions: {
        tabBarLabel: "Explorar",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="pin" size={10} iconStyle={{ color: tintColor }} />
        )
      }},
    Search: {
      screen: Activity,
      navigationOptions: {
        tabBarLabel: "Buscar",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="search" size={10} iconStyle={{ color: tintColor }} />
        )
      }
    },
    Activity: {
      screen: Activity,
      navigationOptions: {
        tabBarLabel: "Mi actividad",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="list" size={10} iconStyle={{ color: tintColor }} />
        )
      }
    }
  },
  {}
);

const MapDrawerNavigator = createDrawerNavigator(
  {
    Map: { screen: MapTabNavigator }
  },
  {}
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    Welcome: { screen: Welcome },
    Main: { screen: Main },
    Login: { screen: Login },
    Register: { screen: Register },
    Map: { screen: MapDrawerNavigator }
  },
  {}
);


console.disableYellowBox = true;
const AppContainer = createAppContainer(AppSwitchNavigator);
export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
