import React, { Component } from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Login from './src/login/components/Login';
import Main from './src/main/components/Main';
import Welcome from './src/main/components/Welcome';
import Home from './src/home/components/Home';

const AppNavigator = createStackNavigator(
  {
    Main: {screen: Main},
    Home: {screen: Home},
    Login: {screen: Login},
    
  },
  {
   
  }
);
console.disableYellowBox = true;
const AppContainer = createAppContainer(AppNavigator);
export default class App extends Component {
  render(){
    return(
     <AppContainer/>
    );
  }
}

