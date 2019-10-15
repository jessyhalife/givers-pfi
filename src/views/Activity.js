import React, { Component } from "react";
import { View, ActivityIndicator, Text, StatusBar } from "react-native";
import { Tabs, Tab, Header } from "native-base";
import { THEMECOLOR } from "../const.js";
const Activity = props => {
  return (
    <View>
      <Header hasTabs>
        <Text>Tu actividad</Text>
      </Header>
      <Tabs>
        <Tab heading="Personas">
          <Text>Acá van las personas</Text>
        </Tab>
        <Tab heading="Eventos">
          <Text>Acá van los eventos</Text>
        </Tab>
        <Tab heading="Puntos de ayuda">
          <Text>Acá van los puntos de ayuda</Text>
        </Tab>
      </Tabs>
    </View>
  );
};

export default Activity;
