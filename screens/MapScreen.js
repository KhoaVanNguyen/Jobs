import React, { Component } from "react";
import { View, Text, ActivityIndicator, TextInput, Slider, Platform } from "react-native";
import { MapView , Constants, Location, Permissions } from "expo";
import { Button, Icon } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions";
import axios from "axios";
import Loading from "../components/Loading";
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
    job: "Software Developer",
    loading: false,
    radius: 50,
    location: null,
    errorMessage: null,
  };
  componentDidMount() {
    this.setState({ mapLoaded: true });
  }
  onRegionChange = region => {
    this.setState({ region });
  };
  fetchJob = () => {
    const { region, job, radius   } = this.state
    this.setState({ loading: true });
    this.props.fetchJobs(region, job, radius,  () => {
      this.props.navigation.navigate("jobdetail");
      this.setState({ loading: false });
    });
  };

  setMyLocation = () => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    
    this.setState({ location });
    console.log(this.location)
  };

  renderLoading = () => {
    if (!this.state.loading) {
      return;
    }
    return <Loading style={styles.loading} />;
  };
  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      );
    }

    const { inputView, 
        searchButton, input, picker, setLocationButton } = styles;
    return (
      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      >
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />

        <View style={inputView}>
          <TextInput
            style={input}
            onChangeText={job => this.setState({ job })}
            value={this.state.job}
          />
        </View>

        <View style={picker}>
          <Slider
            maximumValue={200}
            minimumValue={20}
            value={  this.state.radius }
            onValueChange = { radius => this.setState( {radius: Math.round(radius) }  )  }

          />
          <Text 
            style = {{ backgroundColor: 'rgb(249, 245, 238)'  }}
           > radius: { this.state.radius } km  </Text>
        </View>

        {this.renderLoading()}
        <View style={searchButton}>
          <Button
            title="Search This Area"
            onPress={this.fetchJob}
            icon={{ name: "search" }}
            backgroundColor="#0bc4a7"
          />
        </View>

         <View style={ setLocationButton  }>
          <Button
            title="Set my location"
            onPress={this.setMyLocation}
            icon={{ name: "my-location" }}
            backgroundColor="#0bc4a7"
          />
        </View>

      </View>
    );
  }
}
const styles = {
  searchButton: {
    position: "absolute",
    bottom: 65,
    left: 0,
    right: 0,
    height: 35,
    opacity: 0.8
  },
  setLocationButton: {
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
    opacity: 0.8
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 3,
    borderRadius: 1,
    borderStyle: "solid",
    backgroundColor: "white",
    fontStyle: "italic",
    fontFamily: "HelveticaNeue-Medium",
    textAlign: "center"
  },
  picker: {
    position: "absolute",
    alignSelf: "center",
    top: 90,
    left: 50,
    right: 50,
  },
  loading: {
    position: "absolute",
    alignSelf: "center"
  }
};
export default connect(null, actions)(MapScreen);
