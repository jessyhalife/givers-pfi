import React, {Component} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import db from '../../db';
import firebaseApp from '../../config';

let pplRef = []; //db.collection('people');
console.log(db);
export default class NewPlace extends Component {
    state = { 
        name: '',
        latitude: '',
        longitude: '',
    }
    _registerNew(){
        const uid = firebaseApp.auth().currentUser.uid; // ?  firebaseApp.auth().currentUser.uid : null;
        let {name, latitude, longitude} = this.state;
        pplRef.push({
            name: name,
            latitude: latitude,
            longitude: longitude,
            user: uid
        })
        .then(()=>{
            this.props.navigation.navigate('Home');
        })
        .catch((error)=>{
            console.log(error);
        });
    }
    render(){
        return(
            <View>
                <Text>Nombre</Text>
                <TextInput onChange={(e) => {this.setState({name: e.nativeEvent.text })}} placeholder='Nombre'></TextInput>
                <Text>Latitud</Text>
                <TextInput  onChange={(e) => {this.setState({latitude: e.nativeEvent.text })}} placeholder='Latitud'></TextInput>
                <Text>Latitud</Text>
                <TextInput  onChange={(e) => {this.setState({longitude: e.nativeEvent.text })}}placeholder='Longitud'></TextInput>
                <TouchableOpacity onPress={this._registerNew.bind(this)}>
                    <Text>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }
}