import React, {Component} from 'react';
import {View,  TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { Icon, Image, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
export default class Login extends Component {
    state = {
        isLoading: false,
    };
    _handleLogin = () => {
        this.setState({isLoading: true})
        setTimeout( () => {
            this.changeLoadingState();
        },2000);
    }

    changeLoadingState = () => {
        this.props.navigation.navigate('Home');
    };
    render() {
        return(
            <ScrollView >
                <View style={styles.container}>
                    <View style={styles.header}>
                   <Icon name='gitlab' type='feather' color='#B8B8D1' size={40} reverse raised npm ></Icon>
                   </View>
                <View style={styles.content}>
                    <View>
                        <Text style={styles.inputTitle}>EMAIL</Text>
                        <TextInput style={styles.input} placeholder='example@mail.com' placeholderTextColor= '#ddd'></TextInput>
                        <Text style={styles.inputTitle}>CONTRASEÑA</Text>
                        <TextInput style={styles.input} placeholder='password' placeholderTextColor= '#ddd' secureTextEntry={true}></TextInput>
                    </View>    
                    <View>
                        <TouchableOpacity onPress={this._handleLogin}>
                            <Icon   reverse
                                    name= {this.state.isLoading ? 'done' : 'wb-sunny'}
                                    type='material'
                                    color='#FF6B6C'
                                    underlayColor='white'
                                    >
                            </Icon>
                        </TouchableOpacity>
                        {this.state.isLoading && <Text>Loading..</Text>}
                    </View>
                    <TouchableOpacity style={{marginTop:20}}>
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
            flex: 6,
            alignItems: 'center',
        },
        input: {
            padding: 10,
            borderRadius: 20,
            borderBottomWidth: 1,
            borderColor: '#FF6B6C',
            marginBottom: 30,
            width: 300,
            color: '#FF6B6C',
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
            backgroundColor:'#FF6B6C',
            borderRadius:50,
        }
    }
)