import React, { Component } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
import { Button } from "react-native-elements";
export default class JobDetail extends Component {
    render(){
        return (

            <View style = {styles.view} >
                <Text style = { styles.text } > { this.props.data.formattedRelativeTime  }  </Text>
                <Text style = { styles.text } > { this.props.data.jobtitle  }  </Text>
            </View>

         )
    }
}

const styles = {
  view: {
     borderWidth: 2,
     borderColor: 'black'
  },
  text: {
    fontSize: 20,
    // color: "white",
    textAlign: 'center'
  }
};
