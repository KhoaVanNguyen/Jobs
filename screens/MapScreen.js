import React, { Component } from "react";
import { View, Text, ActivityIndicator, TextInput } from "react-native";
import { MapView } from "expo";
import { Button, Icon } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions";
import axios from "axios";
import Loading from '../components/Loading'
class MapScreen extends Component {
  static navigationOptions = {
    title: "Map",
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="my-location" size={30} color={tintColor} />;
    }
  };

  state = {
    mapLoaded: false,
    region: {
      latitude: 37,
      longitude: -122,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    job: 'Javascript',
    loading: false
  };
  componentDidMount() {
    this.setState({ mapLoaded: true });
  }
  onRegionChange = region => {
    this.setState({ region });
  };
  fetchJob = () => {
    this.setState( { loading: true  } )
    this.props.fetchJobs(this.state.region, this.state.job, () => {
      this.props.navigation.navigate("jobdetail");
      this.setState( { loading: false  } )
    });
  };
  renderLoading = () => {
    if ( !this.state.loading  ){
        return 
    }
    return <Loading style = { styles.loading } />
  }
  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      );
    }

    const { inputView, buttonView, input } = styles;
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />

         <View style={inputView}>
          <TextInput
            style={ input  }
            onChangeText={job => this.setState({ job })}
            value={this.state.job}
          />
        </View>
        { this.renderLoading() }
        <View style={buttonView}>
          <Button
            title="Search This Area"
            onPress={this.fetchJob}
            icon={{ name: "search" }}
            backgroundColor="#0bc4a7"
          />
        </View>
      </View>
    );
  }
}
const styles = {
  buttonView: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    height: 35,
    opacity: 0.8
  },
  inputView: {
    position: "absolute",
    top: 50,
    left: 50,
    right: 50,
    height: 35,
    opacity: 0.8,
  },
  input: {
    height: 40,
    borderColor: "gray", 
    borderWidth: 3,
    borderRadius: 1,
    borderStyle: 'solid',
    backgroundColor: 'white',
    fontStyle: 'italic',
    fontFamily: 'HelveticaNeue-Medium',
    textAlign: 'center'
  },
  loading: {
    position: 'absolute',
    alignSelf: 'center'
  }
};
export default connect(null, actions)(MapScreen);
