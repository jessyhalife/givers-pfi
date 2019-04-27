import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator
} from "react-native";
import { Text, Overlay } from "react-native-elements";
import { THEMECOLOR } from "../../const";
import firebaseApp from "../../config";

export default class Register extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerBackTitle: null,
    headerLeft: null,
    headerTransparent: true
  });
  state = {
    error: false,
    email: null,
    password: null,
    rePassword: null,
    formOK: false,
    loading: false
  };

  _handleRegister = () => {
    this.setState({loading:true});
    let {email, password} = this.state;
   firebaseApp.auth().createUserWithEmailAndPassword(email,password)
    .then((data) => {
      this.setState({error:false, loading:false})
    })
    .catch((error)=>{
      console.log(error);
      this.setState({error:true, loading:false})
    });
    
  };

  componentWillUnmount() {
    console.log(this.state.formOK);
  }
  render() {
    return (
      <View style={styles.container}>
          <Text
            h3
            style={{ paddingLeft: 20, paddingBottom: 20, color: "black" }}
          >
            Bienvenidx!{" "}
          </Text>
          <View style={styles.form}>
            <Text style={styles.inputTitle}>EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="example@mail.com"
              placeholderTextColor="#ddd"
              onChange={e => {
                console.log(e);
                this.setState({ email: e.nativeEvent.text });
              }}
            />
            <Text style={styles.inputTitle}>CONTRASEÑA</Text>
            <TextInput
              style={styles.input}
              placeholder="password"
              placeholderTextColor="#ddd"
              secureTextEntry={true}
              onChange={e => {
                console.log(e);
                this.setState({ password: e.nativeEvent.text });
              }}
            />
            <Text style={styles.inputTitle}>REPETIR CONTRASEÑA</Text>
            <TextInput
              style={styles.input}
              placeholder="repeat password"
              placeholderTextColor="#ddd"
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={styles.register}
              onPress={this._handleRegister}
            >
              {this.state.loading ? <ActivityIndicator size="small" color="white"></ActivityIndicator> :<Text style={{ color: "white" }}>Crear cuenta</Text> }
            </TouchableOpacity>
          </View>
          {/* <View
            style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
          >
          
          </View> */}
        
        {/* <Image
            style={{ flex: 4, width: "100%", height: "100%", padding: 10 }}
            resizeMode="contain"
            source={require("../../assets/img/register.png")}
          /> */}
        <Overlay
          isVisible={false}
          windowBackgroundColor="rgba(255, 255, 255, .8)"
          overlayBackgroundColor="#ddd"
          width="auto"
          height="auto"
        >
        <View>
          <Text h3>Ya podes empezar a colaborar!</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Home");
            }}
          >
            <Text>Bye</Text>
          </TouchableOpacity>
          </View>
        </Overlay>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    flexDirection: "column",
    marginTop: 40
  },
  form: {
    marginTop: 10,
    flex: 2,
    alignItems: "center"
  },
  input: {
    marginTop: 3,
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 30,
    width: 350,
    color: THEMECOLOR,
    fontSize: 12
  },
  inputTitle: {
    alignSelf: "flex-start",
    paddingLeft: 40,
    marginBottom: 5,
    fontSize: 12,
    fontWeight: "bold"
  },
  register: {
    backgroundColor: THEMECOLOR,
    padding: 15,
    borderRadius: 40,
    width: 200,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1
  }
});
