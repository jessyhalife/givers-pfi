import React, {Component} from 'react';
import {View,  TextInput, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import { Input, Image, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {THEMECOLOR} from '../../const';
import firebaseApp from '../../config';

export default class Login extends Component {
    state = {
        loading: false,
        error: false, 
        email: null,
        password: null
    };
    _handleLogin = () => {
        let {email, password} = this.state;
        this.setState({loading:true});
        firebaseApp.auth().signInWithEmailAndPassword(email,password)
            .then(()=>{
                this.props.navigation.navigate('Home');
            })
            .catch((error)=>{
                console.log(error);
                this.setState({loading:false});
            });
    }
    render() {
        return(
            <ScrollView >
                <View style={styles.container}>
                    <View style={styles.header}>
                   {/* <Icon name='gitlab' type='feather' color='#B8B8D1' size={40} reverse raised npm ></Icon> */}
                        <Image style={{width: 180, height: 180}} source={require('../../assets/img/login.png')}></Image>
                   </View>
                <View style={styles.content}>
                    <View>
                        <Text style={styles.inputTitle}>EMAIL</Text>
                        <TextInput style={styles.input} onChange={(e)=> {this.setState({email: e.nativeEvent.text })}} placeholder='example@mail.com' placeholderTextColor= '#ddd'></TextInput>
                        <Text style={styles.inputTitle}>CONTRASEÑA</Text>
                        <TextInput  shake={true} style={styles.input} onChange={(e)=> {this.setState({password: e.nativeEvent.text })}} placeholder='password' placeholderTextColor= '#ddd' secureTextEntry={true}></TextInput>
                    </View>    
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity style={styles.login} onPress={this._handleLogin}>
                       {this.state.loading ? <ActivityIndicator size="small" color="white"></ActivityIndicator>
                        : <Text style={{color:'white'}}>Entrar</Text>}
                            {/* <Icon   
                                    name= {this.state.isLoading ? 'done' : 'wb-sunny'}
                                    type='material'
                                    color='black'
                                    underlayColor='white'
                                    >
                            </Icon> */}
                        
                        </TouchableOpacity>
                       
                    </View>
                    <TouchableOpacity style={{marginTop:20, borderBottomWidth: 1, borderColor: '#eee'}}
                        onPress={()=>{this.props.navigation.navigate('Register')}}>
                        <Text>CREAR NUEVA CUENTA</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView> 
        );
    }
}

const styles = StyleSheet.create(
    {
        login:{
            backgroundColor: THEMECOLOR,
            borderRadius: 40,
            padding: 15,
            width: 200,
            alignItems: 'center',
            marginBottom: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,
        
            elevation: 1, 
          },
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'white',
            alignItems: 'center',
        },
        content:{
            margin: 0,
            flex: 9,
            alignItems: 'center',
            
        },
        header:{
            padding: 40,
            flex: 5,
            alignItems: 'center',
        },
        input: {
            padding: 10,
            borderRadius: 20,
            borderBottomWidth: 1,
            borderColor: THEMECOLOR,
            marginBottom: 30,
            width: 300,
            color: THEMECOLOR,
            fontSize: 17,
        },
        inputTitle:{
            fontSize: 15,
            fontWeight: 'bold'
        },
        jumbotron:{
           // backgroundColor: '#fff',
            padding: 40, 
            width: '100%',
            alignItems: 'flex-start',
           /*  borderRadius: 20,
            shadowColor: "#eee",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 1.41,

            elevation: 5, */
        },
        button:{
            color: 'white',
            alignItems:'center',
            justifyContent:'center',
            width:80,
            height:80,
            borderRadius:50,
        }
    }
)