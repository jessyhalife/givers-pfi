import React, {Component} from 'react';
import { View, ActivityIndicator,Text } from "react-native";
export default class Activity extends Component {
    render()
    {
        return(
            <View>
                <Text>My Activity</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        );
    };
}