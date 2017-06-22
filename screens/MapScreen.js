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
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421  
        }
    }
    componentDidMount(){
        this.setState({ mapLoaded: true })
    }
    onRegionChange = (region) => {
        console.log(region)
        // this.setState({ region })
    }
    fetchJob = async() => {
        let url = 'http://api.indeed.com/ads/apisearch?publisher=2771142258014455&q=java&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json'
        // this.props.fetchJobs
    //     let result = await axios.get(url).then( response => {
    //     // console.log(response)
        
    // })
        let response = await axios.get(url)

        let data = response.data.results
        // console.log(response.data.results)
        // console.log(data)
        this.props.navigation.navigate('joblist', { data: data})
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
              <Button 
                style = {{ marginBottom: 15 }}
                title = 'Fetch Job'
                onPress = { this.fetchJob }
              />
            </View>
        )
    }
}
export default connect(null, actions)(MapScreen)