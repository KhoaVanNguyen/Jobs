import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { MapView } from 'expo'
import { Button } from 'react-native-elements'
import {connect} from 'react-redux'
import * as actions from '../actions'
import axios from 'axios'
class MapScreen extends Component{
    state = {
        mapLoaded: false,
        region: {
          latitude: 37,
          longitude: -122,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421  
        }
    }
    componentDidMount(){
        this.setState({ mapLoaded: true })
    }
    onRegionChange = (region) => {
        this.setState({ region })
    }
    fetchJob = () => {
      this.props.fetchJobs(this.state.region, () => {
          this.props.navigation.navigate('jobdetail')
      })
    }
    render(){
        if (!this.state.mapLoaded ){
            return (
                <View style = {{ flex: 1, justifyContent: 'center' }} > 
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style = {{ flex: 1 }}>
              <MapView style = {{ flex: 1 }} 
                region = { this.state.region }
                onRegionChange={this.onRegionChange}
              />
              <View style = { styles.buttonView }>
                <Button 
                title = 'Search This Area'
                onPress = { this.fetchJob }
                icon = {{ name: 'search' }}
                backgroundColor =  '#0bc4a7'
                />
              </View>
               
            </View>
        )
    }
}
const styles = {
    buttonView:{
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0,
        height: 35,
        opacity: 0.8
    }
}
export default connect(null, actions)(MapScreen)