import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import Slide from '../components/Slide'
import _ from 'lodash'
import { AppLoading } from 'expo'
const SLIDE_DATA = [
    { text: 'Find the job near you', color:'#03A9F4' },
    { text: 'Swap the like the job', color:'#009688' },
    { text: 'Apply job and get work ready!', color:'#07a9e1'}
]

export default class WelcomeScreen extends Component{
    state = { token: null  }
    async componentWillMount(){
        
        let token = await AsyncStorage.getItem('fb_token')
        // if already login 
        console.log(token)
        if ( token  ){
            this.props.navigation.navigate('map')    
        }else {
            this.setState( {  token: false } )
        }
    }
    onSlidesComplete = () => {
        console.log(this)
        this.props.navigation.navigate('auth')
    }
    render(){
        // mới vô load Apploading trước, sau đó check nếu ko có token 
        // -> thay đổi state.token 
        // -> re render again -> lúc này token == false chứ không phải null
        // -> render slides
        if ( this.state.token === null  ){
            return <AppLoading />
        }
        return (
            <View style={{ flex: 1 }} >
                <Slide data={SLIDE_DATA} onComplete = {this.onSlidesComplete}  />  
            </View>
        )
    }
}