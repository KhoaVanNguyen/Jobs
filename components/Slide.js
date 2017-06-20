import React, { Component } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
import { Button } from "react-native-elements";
export default class Slide extends Component {
  renderNextButton(index) {
    const { data } = this.props;
    if (data.length - 1 === index) {
      return <Button title="Go To Sign Up" 
        raised
        onPress = { this.props.onComplete  }
      />;
    }
  }

  renderSlides() {
    const { data } = this.props;
    return data.map((slide, index) => {
      console.log("index " + index);
      return (
        <View
          key={slide.text}
          style={[styles.slide, { backgroundColor: slide.color }]}
        >
          <Text style={styles.text}> {slide.text} </Text>
          {this.renderNextButton(index)}

          {/*{ (size === index + 1) ? <Button title="Sign Up" /> : null  }*/}

        </View>
      );
    });
  }
  render() {
    return (
      <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH
  },
  text: {
    fontSize: 30,
    color: "white",
    textAlign: 'center'
  }
};
