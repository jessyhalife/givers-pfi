//#region IMPORT
import React, { Component } from "react";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  createTabNavigator
} from "react-navigation";

import Login from "./src/views/Login";
import Main from "./src/views/Main";
import Welcome from "./src/views/Welcome";
import MapScreen from "./src/views/map/Index";
import Register from "./src/views/Register";
import NewPeople from "./src/views/map/NewPeople";
import NewPoint from "./src/views/map/NewPoint";
import Activity from "./src/views/Activity";
import { Icon } from "native-base";
import { THEMECOLOR, THEMECOLORLIGHT } from "./src/const";
//#endregion
const MapStackNavigator = createStackNavigator(
  {
    MapScreen: {
      screen: MapScreen,
      navigationOptions: {
        title: "Givers"
      }
    },
    NewPeopleScreen: {
      screen: NewPeople,
      navigationOptions: {
        title: "Registro de personas"
      }
    },
    NewPointScreen: {
      screen: NewPoint,
      navigationOptions: {
        title: "Nuevo punto de ayuda"
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 20 }}
            onPress={() => navigation.openDrawer()}
            name="menu"
            size={30}
          />
        )
      };
    }
  }
);

const MapTabNavigator = createBottomTabNavigator(
  {
    Explore: {
      screen: MapStackNavigator,
      navigationOptions: {
        title: "Givers",
        tabBarLabel: "Explorar",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="pin" size={10} style={{ color: tintColor }} />
        ),
        tabBarOptions: {
          activeTintColor: THEMECOLOR,
          inactiveTintColor: "#c1c1c1"
        }
      }
    },
    Search: {
      screen: Activity,
      navigationOptions: {
        title: "Búsqueda",
        tabBarLabel: "Buscar",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="search" size={10} style={{ color: tintColor }} />
        ),
        tabBarOptions: {
          activeTintColor: THEMECOLOR,
          inactiveTintColor: "#c1c1c1"
        }
      }
    },
    Activity: {
      screen: Activity,
      navigationOptions: {
        tabBarLabel: "Mi actividad",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="list" size={10} style={{ color: tintColor }} />
        ),
        tabBarOptions: {
          activeTintColor: THEMECOLOR,
          inactiveTintColor: "#c1c1c1"
        }
      }
    }
  },
  {
    navigationOptions: {
      title: "USERNAME"
    }
  }
);

const MapDrawerNavigator = createDrawerNavigator(
  {
    Map: { screen: MapTabNavigator }
  },
  { initialRouteName: "Map" }
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
