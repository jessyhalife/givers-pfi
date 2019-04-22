import React, { Component } from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Login from './src/login/components/Login';
import Main from './src/main/components/Main';
const AppNavigator = createStackNavigator(
  {
   Main: {screen: Main},
   Login: {screen: Login},
  },
  {
   
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default class App extends Component {
  render(){
    return(
     <AppContainer/>
    );
  }
}

