import React, { Component } from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Icon,Text} from 'react-native-elements';
import MapGiver from '../../map/components/MapGiver';

import * as data from '../../fakeData/data.json';

export default class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `givvvers`,
     headerTitleStyle : {textAlign: 'center',alignSelf:'center', color: 'white'},
        headerStyle:{
            backgroundColor:'#FF6B6C',
        },
    });

    _fetchLocation(){
      console.log(data.length)
    }
    componentDidMount(){
      this._fetchLocation();
    }
    render(){
      return(
        <View style={styles.container} KeyboardAvoidingView={true}>
          <View style={styles.map} >
            <MapGiver /> 
          </View>
          <View style={styles.text} >
            <Text h4 >Options</Text>
            <Text>Choose your option</Text>
            <View style={{flex: 1, alignItems: 'center'}}>
            <View style={styles.buttonBar }>
             <TouchableOpacity style={styles.button}>
                <Icon   raised
                        name='search'
                        type='material'
                        color='black'
                        underlayColor='white'
                >
                </Icon>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Icon   raised
                        name='face'
                        type='material'
                        color='black'
                        underlayColor='white'
                >
                </Icon>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Icon   raised
                        name='report-problem'
                        type='material'
                        color='black'
                        underlayColor='white'
                >
                </Icon>
              </TouchableOpacity>
            </View>
          </View>
          </View>
       </View>
       );
    }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  search:{
    borderRadius: 20, 
    margin: 20, 
    backgroundColor: 'green'
  },
  map:{
    flex: 5,
  },
  text:{
    flex:2,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding:30
  },
  buttonBar:{
    flexDirection: 'row',
    position: 'absolute', 
    bottom: 0
  },
  button:{
    paddingLeft: 10,
    paddingRight: 25,
  }
})