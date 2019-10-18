import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { H1 } from "native-base";
import Icon from "react-native-vector-icons/AntDesign";

const Header = props => {
  return (
    <View
      style={{
        flex: 2,
        marginTop: 20,
        marginLeft: 20,
        flexDirection: "column",
        marginBottom: 20
      }}
    >
      <View>
        {props.showBack ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#fdfdfd",
              borderRadius: 50,
              padding: 10
            }}
            onPress={() => props.back()}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: 20,
                alignItems: "center"
              }}
            >
              <Icon name="arrowleft" size={15} color="black" />
              <Text
                style={{
                  marginLeft: 2,
                  fontSize: 15,
                  alignSelf: "center",
                  color: "black"
                }}
              >
                ATRÁS
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          undefined
        )}
        <H1 style={{ fontWeight: "bold", color: "black" }}>{props.title}</H1>
      </View>
    </View>
  );
};

export default Header;
