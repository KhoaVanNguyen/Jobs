import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Slide from '../components/Slide'

const SLIDE_DATA = [
    { text: 'Find the job near you', color:'#03A9F4' },
    { text: 'Swap the like the job', color:'#009688' },
    { text: 'Apply job and get work ready!', color:'#07a9e1'}
]


export default class WelcomeScreen extends Component{
    onSlidesComplete = () => {
        console.log("In onSlidesComplete")
        console.log(this)
        this.props.navigation.navigate('auth')
    }
    render(){
        return (
            <View style={{ flex: 1 }} >
                <Slide data={SLIDE_DATA} onComplete = {this.onSlidesComplete}  />  
            </View>
        )
    }
}