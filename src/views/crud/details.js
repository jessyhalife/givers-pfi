import { View, TextInput, StyleSheet, ScrollView } from "react-native";
import React, { Component } from "react";
import { Text, Textarea, Button, H1 } from "native-base";
import { THEMECOLOR } from "../../const.js";
import Header from "../../components/header";
import ButtonsWizard from "../../components/buttons_wizard";

class DetailsComponent extends Component {
  state = {
    details: ""
  };
  componentDidMount() {
    this.setState({ details: this.props.details && "" });
  }
  async submit() {
    await this.props.submit({ details: this.state.details }).then(() => {
      alert("ok");
    });
  }
  render() {
    return (
      <View>
        <ScrollView>
          <Header
            showBack={true}
            title="¿Algún comentario?"
            back={() => {
              this.props.prev();
            }}
          />
          <View>
            <Textarea
              style={{ margin: 20, height: 300, fontSize: 20 }}
              value={this.state.details}
              onChange={e => this.setState({ details: e.nativeEvent.text })}
              rowSpan={5}
              bordered
            />
          </View>
          <View>
            <Button
              style={{ ...styles.button, backgroundColor: THEMECOLOR }}
              onPress={() => {
                this.props.submit({ details: this.state.details });
              }}
            >
              <Text
                style={{
                  color: "white",
                  alignItems: "center",
                  fontWeight: "bold"
                }}
              >
                GUARDAR
              </Text>
            </Button>
          </View>
          <View>
            <Button
              bordered
              light
              style={styles.button}
              onPress={() => {
                this.props.prev();
              }}
            >
              <Text
                style={{
                  color: THEMECOLOR,
                  alignItems: "center",
                  fontWeight: "bold"
                }}
              >
                VOLVER
              </Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 60
  }
});
export default DetailsComponent;
