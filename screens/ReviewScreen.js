import React, { Component } from "react";
import { View, Text, ScrollView, Linking } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions";
import { MapView  } from 'expo'
class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Review Jobs",
      headerRight: (
        <Button
          title="Setitngs"
          backgroundColor="rgba(0,0,0,0)"
          color="rgba(0, 122, 255, 1)"
          onPress={() => {
            navigation.navigate("settings");
          }}
        />
      ),
       tabBarIcon: ({ tintColor }) => {
                return <Icon name = 'remove-red-eye' size = {30} color = {tintColor} />
        }
    };
  };
  renderItems = () => {
   
    
    // debugger;
    return this.props.likedJobs.map(job => {
       const initialRegion={
        latitude: job.latitude,
        longitude: job.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421 
    }
      return (
        <View style={{ height: 300, flex: 1 }}
            key={job.jobkey}
         >
          <Card title={job.jobtitle}
                containerStyle = {{ flex: 1 }}
           >
            <View style = { { height: 120 } } >
                <MapView
                    style = { { flex: 1 } }
                    initialRegion = { initialRegion }
                    cacheEnabled
                    scrollEnabled = {false}
                 />
            </View>

            <View style={styles.innerView}>
              <Text> {job.company}  </Text>
              <Text> {job.formattedRelativeTime}{" "}
              </Text>
            </View>

            <Button
              title="Apply"
              small
              onPress={() =>
                Linking.openURL(job.url).catch(err =>
                  console.error("An error occurred", err)
                )}
              backgroundColor = '#135'
            />

          </Card>
        </View>
      );
    });
  };
  render() {
    return (
      <View>
        <ScrollView scrollEnabled>
          {this.renderItems()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  innerView: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
};

const mapStateToProps = ({ likedJobs }) => {
  // console.log(likedJobs)
  return { likedJobs: likedJobs };
};

export default connect(mapStateToProps, actions)(ReviewScreen);
