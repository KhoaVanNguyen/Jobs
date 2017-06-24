import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import { Button } from "react-native-elements";
import * as actions from "../actions";
import { connect } from "react-redux";
class SettingsScreen extends Component {
  showAlert = (title,isNaviage) => {
    Alert.alert(title, "", [
      { text: "OK", onPress: () => {
          if ( isNaviage )
            this.props.navigation.navigate('map')
      } }
    ]);
  };

  onResetPress = () => {
      if ( this.props.likedJobs.length < 1 ){
          this.showAlert('There is no liked job in your list!', false)
      }else {
          this.showAlert('All liked jobs deleted', true)
      }
  }
  render() {
    return (
      <View>

        <Button
          title = "Reset All Liked Jobs"
          onPress = { this.onResetPress }
          backgroundColor = "red"
        />
      </View>
    );
  }
}

const styles = {
  modal: {
    width: 120,
    height: 120
  },
  container: {
    alignItems: "center",
    justifyContent: "center"
  }
};

const mapStateToProps = ({ likedJobs }) => {
    return { likedJobs }

}

export default connect(mapStateToProps, actions)(SettingsScreen);
