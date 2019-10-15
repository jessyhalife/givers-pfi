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
import Profile from "./src/views/Profile";
import HelpModal from "./src/components/HelpModal.js";
// import { Icon } from "native-base";
import { THEMECOLOR, THEMECOLORLIGHT } from "./src/const";
import Icon from "react-native-vector-icons/AntDesign";

//#endregion
const MapStackNavigator = createStackNavigator(
  {
    MapScreen: {
      screen: MapScreen

      // navigationOptions: {
      //   title: "Givers",
      //   headerTitleStyle: {
      //     textAlign: "center"
      //   },
      //   headerStyle: {
      //     backgroundColor: "#f3f3f3"
      //   }
      // }
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
    },
    HelpScreen: {
      screen: HelpModal
    }
  },
  {
    header: null,
    headerMode: "none"
  }
);

const MapTabNavigator = createBottomTabNavigator(
  {
    Explore: {
      screen: MapStackNavigator,
      navigationOptions: {
        tabBarLabel: "MAPA",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="find" size={18} style={{ color: tintColor }} />
        ),
        tabBarOptions: {
          activeTintColor: THEMECOLOR,
          inactiveTintColor: "#919191",
          style: {
            backgroundColor: "#f3f3f3"
          }
        }
      }
    },
    // Search: {
    //   screen: Activity,
    //   navigationOptions: {
    //     title: "Búsqueda",
    //     tabBarLabel: "BUSCAR",
    //     tabBarIcon: ({ tintColor }) => (
    //       <Icon name="search1" size={18} style={{ color: tintColor }} />
    //     ),
    //     tabBarOptions: {
    //       activeTintColor: THEMECOLOR,
    //       inactiveTintColor: "#919191",
    //       style: {
    //         backgroundColor: "#f3f3f3"
    //       }
    //     }
    //   }
    // },
    Activity: {
      screen: Activity,
      navigationOptions: {
        tabBarLabel: "ACTIVIDAD",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="menuunfold" size={18} style={{ color: tintColor }} />
        ),
        tabBarOptions: {
          activeTintColor: THEMECOLOR,
          inactiveTintColor: "#919191",
          style: {
            backgroundColor: "#f3f3f3"
          }
        }
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "PERFIL",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" size={18} style={{ color: tintColor }} />
        ),
        tabBarOptions: {
          activeTintColor: THEMECOLOR,
          inactiveTintColor: "#919191",
          style: {
            backgroundColor: "#f3f3f3"
          }
        }
      }
    }
  },
  {}
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
