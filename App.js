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
import PointTypeComponent from "./src/views/crud/point.type.js";
import NewPoint from "./src/views/map/NewPoint";
import Activity from "./src/views/Activity";
import Profile from "./src/views/Profile";
import Filters from "./src/components/filters";
import HelpModal from "./src/components/HelpModal.js";
// import { Icon } from "native-base";
import { THEMECOLOR, THEMECOLORLIGHT } from "./src/const";
import Icon from "react-native-vector-icons/AntDesign";
import firebase from "react-native-firebase";
import { AsyncStorage, Alert } from "react-native";
import userService from "./src/services/users.js";

//#endregion
const MapStackNavigator = createStackNavigator(
  {
    MapScreen: {
      screen: MapScreen
    },
    NewPeopleScreen: {
      screen: NewPeople,
      navigationOptions: {
        title: "Registro de personas"
      }
    },
    NewPointScreen: {
      screen: PointTypeComponent,
      navigationOptions: {
        title: "Nuevo punto de ayuda"
      }
    },
    PointScreen: {
      screen: NewPoint,
      navigationOptions: {
        title: "Nuevo punto de ayuda"
      }
    },
    FilterScreen: {
      screen: Filters,
      navigationOptions: {
        tabBarVisible: false
      }
    }
  },
  {
    header: null,
    headerMode: "none"
  }
);
MapStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};
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
  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
    this.tokenReferesh = firebase.messaging().onTokenRefresh(token => {
      var fcm_token = { fcm_token: token };
      // user has a device token
      firebase
        .auth()
        .currentUser.getIdToken()
        .then(idToken => {
          console.log("aca");
          userService
            .updateFCM(idToken, fcm_token)
            .then(response => {
              console.log(response);
              response.json();
            })
            .catch(error => {
              throw error;
            });
        });
    });
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        console.log(notification);
        const { title, body } = notification;
        this.showAlert(title, body);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        console.log(notificationOpen);
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      console.log(notificationOpen);
      this.showAlert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      console.log("message");
      console.log(message);
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    if (title != "" && body != "") {
      Alert.alert(
        title,
        body,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();

    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    var fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
    var fcm_token = { fcm_token: fcmToken };
    // user has a device token
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(idToken => {
        console.log("aca2");
        userService
          .updateFCM(idToken, fcm_token)
          .then(response => {
            console.log(response);
            response.json();
          })
          .catch(error => {
            throw error;
          });
      });
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }

  render() {
    return <AppContainer />;
  }
}
