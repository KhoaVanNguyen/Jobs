import Expo from "expo";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import store from "./store";

import AuthScreen from "./screens/AuthScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import MapScreen from "./screens/MapScreen";
import JobDetailScreen from "./screens/JobDetailScreen";
import ReviewScreen from "./screens/ReviewScreen";
import SettingsScreen from "./screens/SettingsScreen";

class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        main: {
          screen: TabNavigator({
            map: { screen: MapScreen },
            jobdetail: { screen: JobDetailScreen },
            review: {
              screen: StackNavigator({
                review: { screen: ReviewScreen },
                settings: { screen: SettingsScreen }
              })
            }
          })
        }
      },
      {
        navigationOptions: {
          tabBarVisible: false
        },
        lazy: true
      }
    );
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

Expo.registerRootComponent(App);
