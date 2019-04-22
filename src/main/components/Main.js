import React, { Component } from 'react';
import { View, Text , StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Icon } from 'react-native-elements';


export default class Main extends Component {
    _navigateLogin = () => {
        console.log('entro acá');
        this.props.navigation.navigate('Login');
    };
    render(){
        return(
            <View style={styles.container}>
              <View style={styles.header}>
                  <Image style={{height: 300}} source={require('../../assets/img/helpmain.png')} ></Image>
              </View>
              <View style={styles.content}>
                <Text style={{color: '#424242', fontSize:20, fontWeight: 'bold', marginBottom: 30}}>
                  Lorem Impsum
                </Text>
                <Text style={{color: '#858484', fontSize: 15}}>
                Phasellus ac augue sed tellus malesuada maximus at mollis nisl. Proin rutrum ipsum vitae
                Phasellus ac augue sed tellus malesuada maximus at mollis nisl. TEST!
                Dui euismod pretium. Nunc sed eros nec ligula ultrices pulvinar. Vestibulum tristique erat quis augue.
                </Text>
              </View>
              <View style={styles.footer}>
                <TouchableOpacity onPress={this._navigateLogin}
                >
                  <Icon   reverse
                          raised
                          name='arrow-forward'
                          type='material'
                          color='#FF6B6C'
                          underlayColor='white'
                          >
                  </Icon>
                </TouchableOpacity>
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex:4,
    backgroundColor: '#f3f3f3',
  },
  content: {
    flex: 3,
    backgroundColor: 'white',
    padding: 25,
  },
  footer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingBottom: 30,
    paddingRight: 30,
  }
});
