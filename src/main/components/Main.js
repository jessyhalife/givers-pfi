import React, { Component } from 'react';
import { View, Text , StyleSheet, TouchableOpacity, Image, Button} from 'react-native';
import {THEMECOLOR} from '../../const';

export default class Main extends Component {
    static navigationOptions = ({ navigation }) => ({
      headerBackTitle: null,
      headerLeft: null,
      headerTransparent: true
    });
    _navigateLogin = () => {
        console.log('entro acá');
        this.props.navigation.navigate('Login');
    };
    
    render(){
        return(
            <View style={styles.container}>
              <View style={styles.header}>
                  <Image style={{  flex: 1,
                    width: null,
                    height: null,
                    padding: 40
                    }} source={require('../../assets/img/air-support.png')} ></Image> 
              </View>
              <View style={styles.content}>
                <Text style={{color: '#424242', fontSize:20, fontWeight: 'bold', marginBottom: 30}}>
                  Lorem Impsum
                </Text>
                <Text style={{color: '#858484', fontSize: 15}}>
                Phasellus ac augue sed tellus malesuada maximus at mollis nisl. Proin rutrum ipsum vitae
                Phasellus ac augue sed tellus malesuada maximus at mollis nisl.
                Dui euismod pretium. Nunc sed eros nec ligula ultrices pulvinar. Vestibulum tristique erat quis augue.
                </Text>
              </View>
              <View style={styles.footer}>
                {/* <TouchableOpacity onPress={this._navigateLogin}
                >
                 
                  {/* <Icon   reverse
                          raised
                          name='arrow-forward'
                          type='material'
                          color= 'black'
                          underlayColor='white'
                          >
                  </Icon> 
                </TouchableOpacity> */}
                
                <TouchableOpacity style={styles.register}
                onPress={()=>{this.props.navigation.navigate('Register')}}>
                  <Text style={{color: 'white'}}>Crear cuenta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.login} onPress={this._navigateLogin}>
                  <Text style={{color: 'black'}}>Iniciar sesión</Text>
                </TouchableOpacity>
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  login:{
    borderRadius: 40,
    padding: 15,
    width: 200,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  register:{
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
    marginTop: 30,
  },
  header: {
    paddingTop: 2,
    flex:3,
    backgroundColor: 'white',
  },
  content: {
    flex: 2,
    backgroundColor: 'white',
    padding: 20,
  },
  footer: {
    flex: 2,
    alignItems: 'center',
    paddingBottom: 20,
    paddingRight: 30,
  }
});
