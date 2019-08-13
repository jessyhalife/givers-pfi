import React, { Component } from "react";
import {
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import firebaseApp from "../../config";
import {
  Container,
  Form,
  Item,
  Input,
  Label,
  Content,
  Header,
  H1,
  Text,
  Icon,
  Button,
  Badge,
  Textarea
} from "native-base";
export default class Register extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `GIVERS`,
    headerTitleStyle: { textAlign: "center", alignSelf: "center" }
  });

  state = {
    error: false,
    formOK: false,
    loading: false
  };

  _handleSave = () => {};

  componentWillUnmount() {}
  render() {
    return (
      <ScrollView>
        <Container>
          <Content>
            <View style={{ margin: 10, marginBottom: 30 }}>
              <H1>Registrar persona/s</H1>
            </View>
            <Text style={styles.labels}>¿Dónde?</Text>
            <View style={styles.inputs}>
              <Input />
              <Icon
                name="navigate"
                onPress={() => alert("current location!")}
              />
            </View>
            <Text style={styles.labels}>¿Cuántos son?</Text>
            <View style={styles.inputs}>
              <Input />
              <Badge success style={{ marginRight: 5 }}>
                <Icon name="add" />
              </Badge>
              <Badge info>
                <Icon name="remove" />
              </Badge>
            </View>
            <Text style={styles.labels}>¿Edades?</Text>
            <View style={styles.inputs}>
              <Button rounded success style={styles.bullets}>
                <Icon name="add" />
              </Button>
              <Button rounded success style={styles.bullets}>
                <Icon name="add" />
              </Button>
              <Button rounded success style={styles.bullets}>
                <Icon name="add" />
              </Button>
              <Button rounded success style={styles.bullets}>
                <Icon name="add" />
              </Button>
            </View>
            <Text style={styles.labels}>¿Necesidades?</Text>
            <View style={styles.inputs}>
              <Button rounded primary style={styles.bullets}>
                <Icon name="add" />
              </Button>
              <Button rounded primary style={styles.bullets}>
                <Icon name="add" />
              </Button>
              <Button rounded primary style={styles.bullets}>
                <Icon name="add" />
              </Button>
              <Button rounded primary style={styles.bullets}>
                <Icon name="add" />
              </Button>
              <Button rounded primary style={styles.bullets}>
                <Icon name="add" />
              </Button>
              <Button rounded primary style={styles.bullets}>
                <Icon name="add" />
              </Button>
              <Button rounded primary style={styles.bullets}>
                <Icon name="add" />
              </Button>
              <Button rounded primary style={styles.bullets}>
                <Icon name="add" />
              </Button>
              <Button rounded primary style={styles.bullets}>
                <Icon name="add" />
              </Button>
              <Button rounded primary style={styles.bullets}>
                <Icon name="add" />
              </Button>
              <Button rounded primary style={styles.bullets}>
                <Icon name="add" />
              </Button>
              <Button rounded primary style={styles.bullets}>
                <Icon name="add" />
              </Button>
              <Button rounded primary style={styles.bullets}>
                <Icon name="add" />
              </Button>
              <Button rounded primary style={styles.bullets}>
                <Icon name="add" />
              </Button>
              <Button rounded primary style={styles.bullets}>
                <Icon name="add" />
              </Button>
              <Button rounded primary style={styles.bullets}>
                <Icon name="add" />
              </Button>
            </View>
            <Text style={styles.labels}>Tenés más info?</Text>
            <View style={{ marginLeft: 20, marginRight: 20 }}>
              <Textarea rowSpan={4} bordered placeholder="Textarea" />
            </View>
            <View style={styles.buttons}>
              <Button
                rounded
                danger
                onPress={this._handleLogin}
                style={{ padding: 20 }}
              >
                <Text>Guardar</Text>
              </Button>
              <Button transparent onPress={() => {}}>
                <Text>Cancelar</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  inputs: {
    marginRight: 20,
    marginLeft: 20,
    flexDirection: "row",
    flexWrap: 'wrap'
  },
  labels: {
    marginLeft: 20
  },
  bullets: {
    margin: 10,
    padding: 5,
  },
  buttons: {
    alignItems: "center",
    marginTop: 50
  }
});
