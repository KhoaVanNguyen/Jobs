import React, { Component } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
import { Button } from "react-native-elements";
export default class JobDetail extends Component {
    render(){
        return (

            <View>
                <Text style = { styles.text } > { this.props.data.jobtitle  }  </Text>
            </View>

         )
    }
}

const styles = {
  text: {
    fontSize: 30,
    color: "white",
    textAlign: 'center'
  }
};
