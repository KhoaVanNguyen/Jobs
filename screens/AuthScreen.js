import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import Expo from 'expo'
import * as actions from '../actions';
import {connect} from 'react-redux'
class AuthScreen extends Component{

    componentDidMount() {
        this.props.facebookLogin();
        this.onFacebookAuth(this.props)
    }
    
    componentWillReceiveProps(nextProps){
        console.log('in componentWillReceiveProps')
        this.onFacebookAuth(nextProps)
    }

    onFacebookAuth(props){
        if ( props.token  ){
            console.log('in onFacebookAuth')
            this.props.navigation.navigate('map')
        }
    }
    
    render(){
        return (
            <View>
                <Button 
                  title = "FB Login"  
                 />
              
            </View>
        )
    }
}
const mapStateToProps = ({ auth }) => {
    console.log('in mapStateToProps')
    console.log(auth.token)
    return { token: auth.token  }
}
export default connect(mapStateToProps, actions)(AuthScreen)